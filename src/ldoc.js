/*
 * Copyright 2019 Adam Bertrand Berger
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const l = require('l-html');
const marked = require('marked');

class Site {
    constructor(pages, init) {
        this.currentPage = pages.length > 0 ? pages[0] : null;
        this.pages = {};
        if (pages.length > 0) {
            this.addToPages(pages[0]);
        }
        if (pages.length > 1) {
            for (let i=1; i<pages.length; ++i) {
                const a = pages[i - 1],
                      b = pages[i];

                this.pages[b.url] = b;
                this.addToPages(b);
                
                a.nextPage = b;
                b.prevPage = a;
            }
        }
    }

    defaultHeader() {
        return l.div({ align: 'center', class: 'ldoc-header' },
                     l.h2(this.currentPage.name, { class: 'ldoc-page-name' })
                    );
    }

    addToPages(page) {
        this.pages[page.url] = page;
        for (const child of page.children) {
            this.pages[child.url] = child;
            this.addToPages(child);
        }
    }

    goToHash(hash) {
        hash = hash.substring(1);
        if (this.pages[hash]) {
            this.currentPage = this.pages[hash];
        }
    }

    goDirection(direction) {
        if (this.currentPage[direction + 'Page']) {
            return this.currentPage[direction + 'Page'];
        }
        return null;
    }

    render(parent=document.body) {
        if (this.currentPage) {
            if (document.location.hash !== '#'+this.currentPage.url) {
                document.location.hash = '#'+this.currentPage.url;
                return;
            }
            
            if (this.currentPage.html instanceof File) {
                parent.style.visibility = 'hidden';
                this.currentPage.getPageAjax(c => {
                    if ((
                        this.currentPage.html.path &&
                            this.currentPage.html.path.endsWith('.html') &&
                            this.currentPage.contentType === 'auto'
                    ) ||
                        this.currentPage.contentType === 'html'
                       ) {
                        this.setContent(parent, c);
                    } else {
                        this.setContent(parent, marked(c));
                    }
                    ldoc.onpageload(this.currentPage);
                    setTimeout(() => parent.style.visibility = null, 0);
                });
            } else {
                this.setContent(parent);
                ldoc.onpageload(this.currentPage);
            }
        }
    }

    setContent(parent, pageHtml=this.currentPage.html) {
        document.title = docName !== null ? `${docName} - ${this.currentPage.name}` : this.currentPage.name;
        
        const prev = this.getPrev(),
              next = this.getNext(),
              up = this.getUp();

        const html =  l.div(
            l.table({ class: 'ldoc-nav-bar', width: '100%' }, l.tr(
                l.td({ style: 'text-align: left; width: 33%;' }, l.a(!prev ? '' : prev.name, { class: 'ldoc-nav ldoc-left-nav', href: '#'+ (!prev ? '' : prev.url) })),
                l.td({ style: 'text-align: center; width: 33%;' }, l.a(!up ? '' : up.name, { class: 'ldoc-nav ldoc-right-nav', href: '#'+ (!up ? '' : up.url) })),
                l.td({ style: 'text-align: right; width: 33%' }, l.a(!next ? '' : next.name, { href: '#'+ (!next ? '' : next.url), class: 'ldoc-nav ldoc-up-nav' }))
            ))
        );

        if (!this.currentPage.hideHeader) {
            if (pageHeader !== null) {
                this.addContent(html, pageHeader);
            } else {
                l(html, this.defaultHeader());
            }
        }

        this.addContent(html, this.currentPage.header);
        this.addContent(html, pageHtml);
        this.addContent(html, this.currentPage.footer);

        if (pageFooter !== null) {
            this.addContent(html, pageFooter);
        }

        l.set(parent, html);
    }

    addContent(node, page) {
        if (typeof page === 'string') {
            node.innerHTML += page;
        } else if (typeof page === 'function' ) {
            this.addContent(node, page());
        } else {
            l(node, page);
        }
    }

    getDown() {
        return this.goDirection('down');
    }

    getUp() {
        return this.goDirection('up');
    }

    getNext() {
        if (this.currentPage.downPage) {
            return this.currentPage.downPage;
        } else if (this.currentPage.nextPage) {
            return this.currentPage.nextPage;
        } else if (this.currentPage.upPage && this.currentPage.upPage.nextPage) {
            return this.currentPage.upPage.nextPage;
        }
        return null;
    }

    getPrev() {
        if (this.currentPage.prevPage) {
            return this.currentPage.prevPage.getLastPage();
        } else if (this.currentPage.upPage) {
            return this.currentPage.upPage;
        }
        return null;
    }
}

class File {
    constructor(path) {
        this.path = path;
    }
}

class Page {
    constructor(name, url, html, init={}) {
        this.name = name;
        this.url = url;
        this.html = html;

        // to navigate on the same depth
        this.prevPage = null;
        this.nextPage = null;

        // to navigate down to children
        this.downPage = null;
        this.upPage = null;

        this.children = [];
        this.init = init;
        this.hideHeader = init.hideHeader;
        this.contentType = init.contentType || 'auto';

        this.footer = init.footer || '';
        this.header = init.header || '';

        if (!html) {
            throw new Error('Pages require content. You can pass ldoc.page a DOM node, an HTML string, or a file as a 3rd argument to specify the content of the page.');
        }

        if (typeof this.html === 'string') {
            if (this.contentType === 'auto' || this.contentType === 'md') {
                this.html = marked(this.html);
            }
        }

        return this;
    }

    getPageAjax(callback) {
        var xhttp = new XMLHttpRequest();
        const page = this;
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const response = this.responseText;
                callback(response);
            }
        };
        let path = this.html.path;
        if (!path) {
            path = `${this.url}.md`;
        }
        xhttp.open('GET', path, true);
        xhttp.send();
    }

    initializeChildren() {
        if (this.children.length > 0) {
            this.downPage = this.children[0];
            this.children[0].upPage = this;

            let i = 1;
            for (; i<this.children.length; ++i) {
                const a = this.children[i - 1],
                      b = this.children[i];

                a.nextPage = b;
                b.prevPage = a;
                
                b.upPage = this;

                a.initializeChildren();
                b.initializeChildren();
            }
        }
    }

    add(...children) {
        children = children.flat();
        this.children = this.children.concat(children);
    }

    getLastPage() {
        if (this.children.length > 0) {
            return this.children[this.children.length - 1].getLastPage();
        }
        return this;
    }
}

const ldoc = {};
ldoc.renderSiteMap = function (cursor, depth=0, parent=document.body) {
    while (cursor) {
        let nextParent = l.li({ class: 'ldoc-sitemap-item' }, l.a(cursor.name, { href: '#'+cursor.url, class: 'ldoc-sitemap-link' }));
        l(parent, nextParent);
        if (cursor.children.length > 0) {
            const list = l.ol({ class: 'ldoc-sitemap-item' });
            ldoc.renderSiteMap(cursor.children[0], depth + 1, list);
            l(nextParent, list);
        }
        cursor = cursor.nextPage;
    }
    return parent;
}
ldoc.render = (...pages) => {
    if (pages && pages.length > 0) {
        pages = pages.flat();

        let init = {};
        if (!(pages[0] instanceof Page)) {
            init = pages[0];
            pages.shift();
        }

        const logo = init.logo ;
        
        ldoc.site = new Site(pages);
    } else {
        ldoc.site = new Site(ldoc.pages);
    }

    for (const page of Object.values(ldoc.site.pages)) {
        page.initializeChildren();
    }
    
    const site = ldoc.site;

    function hashChange() {
        site.goToHash(window.location.hash);
        site.render();
    }
    
    window.addEventListener('hashchange', function () {
        hashChange();
    });

    window.addEventListener('keydown', function (e) {
        switch (e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
            const prevPage = site.getPrev();
            if (prevPage) {
                site.currentPage = prevPage;
                site.render();
            }
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            const nextPage = site.getNext();
            if (nextPage) {
                site.currentPage = nextPage;
                site.render();
            }
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            const downPage = site.getDown();
            if (downPage) {
                site.currentPage = downPage;
                site.render();
            }
            break;
        case 'ArrowUp':
        case 'w':
        case 'W':
            const upPage = site.getUp();
            if (upPage) {
                site.currentPage = upPage;
                site.render();
            }
            break;
        }
    });

    hashChange();
};
function getVal(val) {
    if (typeof val === 'function') {
        return getVal(val());
    }
    if (typeof val === 'object') {
        return val.outerHTML;
    }
    return val;
}
let docName = null;
ldoc.name = n => {
    docName = n;
};
let pageHeader = null,
    pageFooter = null;
ldoc.header = (html, init={}) => {
    if (init.contentType === 'html') {
        pageHeader = html;
    } else {
        pageHeader = () => marked(getVal(html));
    }
};
ldoc.footer = (html, init={}) => {
    if (init.contentType === 'html') {
        pageFooter = html;
    } else {
        pageFooter = () => marked(getVal(html));
    }
};
ldoc.currentPage = () => ldoc.site.currentPage;
ldoc.pageName = () => {
    if (!ldoc.site) {
        throw new Error('You must use ldoc.pageName from within a function only. For example: `ldoc.header(() => ldoc.pageName())`');
    }
    
    const page = ldoc.currentPage();
    if (page) {
        return page.name;
    } else {
        return null;
    }
};
ldoc.pages = [];
ldoc.subpages = [];
ldoc.page = (...args) => {
    const page = new Page(...args);
    ldoc.pages.push(page);
    return page;
};
ldoc.subpage = (parentUrl, ...args) => {
    const page = new Page(...args);
    let found = false;
    for (const parent of ldoc.pages) {
        if (parent.url === parentUrl) {
            parent.add(page);
            found = true;
            break;
        }
    }
    if (!found) {
        for (const parent of ldoc.subpages) {
            if (parent.url === parentUrl) {
                parent.add(page);
                found = true;
                break;
            }
        }
    }
    
    if (!found) {
        throw new Error(`No parent page with url ${parentUrl}`);
    }
    ldoc.subpages.push(page);
    return page;
};
ldoc.sitemap = () => {
    return ldoc.renderSiteMap(ldoc.pages[0], 0, l.ol({ class: 'ldoc-sitemap', style: { textAlign: 'left' }})).outerHTML;
};
ldoc.file = path => new File(path);
ldoc.onpageload = () => {};

module.exports = ldoc;
