ldoc.name('ldoc');
ldoc.header(() => l(() => table(
    { width: '100%' },
    tr(
        td({style: 'width: 33%;' },
           img({ src: '../img/logo.png', width: '100px' }),
          ),
        td({style: 'width: 33%; text-align: center;' },
           h2(ldoc.pageName()),
          ),
        td({style: 'width: 33%;' }),
    )
)));

ldoc.page('Introduction', 'intro', l(() => div(
    div(
        { align: 'center' },
        img({ src: '../img/logo.png', width: '200px' }),
        div(
            a({ href: 'https://travis-ci.org/adambertrandberger/ldoc'}, img({ alt: 'build status', src: 'https://travis-ci.org/adambertrandberger/ldoc.svg?branch=master' })),
        ),
    ),
    p(`
ldoc is a Javascript library for creating navigation enabled HTML documents. It supports browser navigation with the forward and backward buttons, keyboard shortcuts, nested
pages, and can be styled however you like. This very page is created using ldoc.
`),
    span(`
As you browse the documentation, try using the "w", "a", "s", "d" or arrow keys to navigate. Notice how the page history is saved, and how the url stores which page you last visited.
But wait, there's more! Try out the
`), a({ href: '#overview' }, 'overview'), span(`
page to see how a site map can be automatically generated for your site too.
`)
)), { hideHeader: true });

ldoc.page('Overview', 'overview', ldoc.sitemap());

ldoc.page('Installation', 'installation', l(() => div(
    p(`
ldoc is only for browsers. To use it, just download the ldoc.js Javascript file and include it in your HTML like this:
    `),
    pre(code(`
<script src="ldoc.js"></script>
    `)),
    span(`
You can download ldoc.js by right clicking and clicking "Save Link" in your browser 
`), a({ href: 'https://adambertrandberger.github.io/ldoc/dist/ldoc.js' }, 'here.'),
)));

ldoc.page('Usage', 'usage', l(() => div(
    p(`
After sourcing the ldoc.js file, you will have one new variable in the window's namespace called "ldoc".

This object has the following functions available: 
    `),
    style('#functions tr :nth-child(1) { white-space: pre; }'),
    table({ border: '1', id: 'functions' },
          tr(
              td(
                  b('Function')
              ),
              td(
                  b('Purpose')
              ),
          ),

          tr(
              td(
                  'ldoc.render([parent=document.body])'
              ),
              td(
                  'Sets the children of "parent" to the document that has been described from previous ldoc calls. Always call this once, and call it last.'
              )
          ),
          
          tr(
              td(
                  'ldoc.page(name, url, content [, config={}])'
              ),
              td(
                  'Adds a new page to the document with name of "name", which is accessible via the hash "url", with the content "content"'
              )
          ),
          
          tr(
              td(
                  'ldoc.subpage(parentUrl, name, url, content [, config={}])'
              ),
              td(
                  'Adds a subpage to the page with "parentUrl" , which is accessible via the hash "url", with the content "content"'
              )
          ),
          
          tr(
              td(
                  'ldoc.header(content)'
              ),
              td(
                  'Override the default header with the given content.'
              )
          ),

          tr(
              td(
                  'ldoc.footer(content)'
              ),
              td(
                  'Set some content to be displayed on every page.'
              )
          ),

          tr(
              td(
                  'ldoc.sitemap()'
              ),
              td(
                  'Creates the sitemap. Can be added to the content of any page.'
              )
          ),

          tr(
              td(
                  'ldoc.name(name)'
              ),
              td(
                  'Sets a name for the entire document that is used for the document.title of the pages.'
              )
          ),
          
          tr(
              td(
                  'ldoc.pageName()'
              ),
              td(
                  'Gets the current page\'s name. Can be added to the content of any page.'
              )
          ),
          
         ),
)));

ldoc.subpage('usage', 'Creating Pages', 'creating-pages', l(() => div(
    p(`
All documents can be created via side-effecting calls to "ldoc.page" and "ldoc.subpage". Let's go over "ldoc.page" first.
    `),
    pre(code(`
ldoc.page(name, url, content [, config={}])        
    `)),
    p(`
Here is a basic example:
    `),
    pre(code(`
ldoc.page('My First Page', 'first-page', '<div>This is nice!</div>')
ldoc.page('My Second Page', 'second-page', '<div>Wow</div>')
ldoc.render();
    `)),
    p(`
You can see that the order that "ldoc.page" is called is important. You must call the function in the order you want it to appear in the document. Also, note how the
last function call that is made is to "ldoc.render()". This is a requirement for all ldoc documents, as it specifies when you are finished specifying your pages.
    `),

    span(`
The content of pages can be specified as an HTML string, such as "<div>hi</div>" or a DOM node. DOM nodes can be created with "document.createElement", or you
can use a DOM node generation library. I suggest using `),
    a({ href: 'https://github.com/adambertrandberger/l' }, code(' l ')),
    span(`as I am the author of that library; however, there are plenty of other DOM node generating libraries to
look at.
    `), code(' l '), span(`
is a good fit because it allows for a special syntax to write HTML that is not offered by any other Javascript libraries.
`),
    br, br,
    span(`
The same example above would look like this using
    `), code(' l '), span(': '),
    pre(code(`
ldoc.page('My First Page', 'first-page', l(() => div('This is nice!')));
ldoc.page('My Second Page', 'second-page', l(() => div('Wow')));
ldoc.render();
    `)),
    p(`
The difference might not look significant in such a small example, but as your project grows it will make it easier to work with.
    `),
    p(`
Alternatively, you could use AJAX calls to load HTML template files. I'm considering adding this as a built-in feature to ldoc.
    `),
    p(`
All pages are rendered with a header by default. Sometimes it is necessary to hide the header for certain pages. For this you can specify the "hideHeader" flag in the optional config argument:
    `),
    pre(code(`
ldoc.page('My First Page', 'first-page', l(() => div('Without header')), { hideHeader: true });
ldoc.render();
    `))
)));

ldoc.subpage('usage', 'Creating Sub-Pages', 'creating-sub-pages', l(() => div(
    p(`
As you can tell from the documentation for ldoc, ldoc supports having nested pages. Nesting pages enables you to have a center navigation button that brings the user
back to the parent page. This is useful if you have a summary page, with more detailed pages below it. For example, you can press the "w" or up arrow button to go back to the 
parent "Usage" page.
    `),
    pre(code(`
ldoc.subpage(parentUrl, name, url, content [, config={}])        
    `)),
    p(`
Creating subpages has the same rules as creating normal pages, except there is an added argument: "parentUrl". The "parentUrl" tells the subpage who it belongs to. 
As long as you have defined the parent page before calling "ldoc.subpage", you can put that page's url in as the first argument to "ldoc.subpage", and it will
make a new child page. See this example:
    `),
    pre(code(`
ldoc.page('Parent Page', 'parent-page', l(() => div('I\\'m the boss.')));
ldoc.subpage('parent-page', 'Child Page', 'child-page', l(() => div('Yes you are.')));
ldoc.render();
    `)),
    p(`
Pages and subpages can be used together to create whatever kind of nesting you can imagine. Subpages can have subpages too!
    `),
    pre(code(`
ldoc.page('Parent Page', 'parent', l(() => div('I\\'m the boss.')));
ldoc.subpage('parent', 'Child', 'child', l(() => div('I\\'m the first.')));
ldoc.subpage('child', 'Child Child', 'child-child', l(() => div('I\\'m the second.')));
ldoc.render();
    `)),
    span(`
The same config object can be passed to "ldoc.subpage" as "ldoc.page" too. For example, you can hide the header on a subpage by passing`), code(` {hideHeader: true}`), '.',
    
)));

ldoc.subpage('usage', 'Headers and Footers', 'headers-and-footers', l(() => div(
    p(`
Each page has a default header. This header is just a centered h2 tag with the current page's name in it. If you want to create your own header you can override the default by calling:
    `),
    pre(code(`
ldoc.header(content)
    `)),
    `
Where "content" is either a string or DOM node, or a function that produces one of those. If you do give it a function, you gain access to another function: `, code('ldoc.pageName()'), '.',
    `
You can use this function to refer to the name of the current page that is being viewed. Here is an example of using it:
    `,
    pre(code(`
ldoc.header(() => \`<h2>$\{ldoc.pageName()\}</h2>\`);
    `)), `
This example will replace the center aligned default header, with a left aligned one. Note that if you didn't use a function when calling "ldoc.pageName" you will receive an error.
`,
    p(`
Unlike the header, there is no default footer. You can set a footer by calling:
    `), pre(code(`
ldoc.footer(content)
    `)), `
Other than there being no default footer, the same rules for the header also apply to the footer.
`,
)));

ldoc.subpage('usage', 'Rendering the Site Map', 'rendering-the-site-map', l(() => div(
    'awoefij'
)));

ldoc.subpage('usage', 'Setting the Document Name', 'setting-the-document-name', l(() => div(
    'oaiwjef'
)));

ldoc.page('Additional Resources', 'additional-resources', l(() => div(
    `Need more examples? Take a look at the source code for this documentation. You can find the source at`,
    a({ href: 'https://github.com/adambertrandberger/ldoc' }, 'https://github.com/adambertrandberger/ldoc'),
    br,br,
    span(`
To learn more about generating the HTML needed for ldoc via Javascript, take a look at 
    `), a({ href: 'https://github.com/adambertrandberger/l' }, 'https://github.com/adambertrandberger/l'),
    p(`The documentation for l also includes related libraries that can be used for the same purpose.`),
)));

ldoc.page('License', 'license', l(() => div(pre({ style: 'text-align: center;' }, code(`
Copyright 2019 Adam Bertrand Berger

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
`)))));

ldoc.render();
