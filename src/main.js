const l = require('l-html');

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
            this.render();

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
            window.location.hash = this.currentPage.url;
            document.title = docName !== null ? `${docName} - ${this.currentPage.name}` : this.currentPage.name;
            const prev = this.getPrev(),
                  next = this.getNext(),
                  up = this.getUp();

            const ctx = { defaultHeader: this.defaultHeader.bind(this),
                          addContent: this.addContent.bind(this),
                          currentPage: this.currentPage,
                          prev, next, up,
                          pageHeader, pageFooter,
                        };

            l.set(
                parent,
                l.with(ctx,
                       function () {
                           const html =  div({ class: 'ldoc-nav-bar' },
                                             table({ width: '100%' }, tr(
                                                 td({ style: 'text-align: left; width: 33%;' }, a(!prev ? '' : prev.name, { class: 'ldoc-nav ldoc-left-nav', href: '#'+ (!prev ? '' : prev.url) })),
                                                 td({ style: 'text-align: center; width: 33%;' }, a(!up ? '' : up.name, { class: 'ldoc-nav ldoc-right-nav', href: '#'+ (!up ? '' : up.url) })),
                                                 td({ style: 'text-align: right; width: 33%' }, a(!next ? '' : next.name, { href: '#'+ (!next ? '' : next.url), class: 'ldoc-nav ldoc-up-nav' }))
                                             ))
                                            );

                           if (!currentPage.hideHeader) {
                               if (pageHeader !== null) {
                                   addContent(html, pageHeader);
                               } else {
                                   l(html, defaultHeader());
                               }
                           }

                           addContent(html, currentPage.html);

                           if (pageFooter !== null) {
                               addContent(html, pageFooter);
                           }

                           return html;
                       }));
        }
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
        
        return this;
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

function renderSiteMap(cursor, depth=0, parent=document.body) {
    while (cursor) {
        let nextParent = l.li(l.a(cursor.name, { href: '#'+cursor.url }));
        l(parent, nextParent);
        if (cursor.children.length > 0) {
            const list = l.ol();
            renderSiteMap(cursor.children[0], depth + 1, list);
            l(nextParent, list);
        }
        cursor = cursor.nextPage;
    }
    return parent;
}

const ldoc = {};
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
            const prevPage = site.getPrev();
            if (prevPage) {
                site.currentPage = prevPage;
                site.render();
            }
            break;
        case 'ArrowRight':
        case 'd':
            const nextPage = site.getNext();
            if (nextPage) {
                site.currentPage = nextPage;
                site.render();
            }
            break;
        case 'ArrowDown':
        case 's':
            const downPage = site.getDown();
            if (downPage) {
                site.currentPage = downPage;
                site.render();
            }
            break;
        case 'ArrowUp':
        case 'w':
            const upPage = site.getUp();
            if (upPage) {
                site.currentPage = upPage;
                site.render();
            }
            break;
        }
    });

    hashChange();
    site.render();
};
let docName = null;
ldoc.name = n => {
    docName = n;
};
let pageHeader = null,
    pageFooter = null;
ldoc.header = html => {
    pageHeader = html;
};
ldoc.footer = html => {
    pageFooter = html;
};
ldoc.currentPage = () => ldoc.site.currentPage;
ldoc.pageName = () => {
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
ldoc.sitemap = () => () => l.with({ renderSiteMap }, () => renderSiteMap(ldoc.pages[0], 0, ol({ style: { textAlign: 'left' }})));

module.exports = ldoc;
