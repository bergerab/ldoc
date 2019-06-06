
You can also separate your HTML in to a separate file and have ldoc load a markdown or HTML file via an AJAX request. To be able to do this, you must host your ldoc document on a web server (due to security issues).

You can specify a page to be loaded from a file by passing <code>ldoc.page</code> a 3rd argument of <code>ldoc.file([path])</code>. ldoc will guess if the file is markdown or HTML based on the file extension.
You can override this behavior by giving `ldoc.page` a config object that contains `{contentType: 'md'}` if you want to force it to use markdown, or `{contentType: 'html'}` if you want to force it to use HTML.

```javascript
ldoc.page('Meatball Stew', 'meatball-stew', ldoc.file('meatball-stew.html'));

// or if you want to use markdown:

ldoc.page('Meatball Stew', 'meatball-stew', ldoc.file('meatball-stew.md));
```

If you don't give `ldoc.file([path])` a path, ldoc will expect there to be a markdown file with the same name as the page's hash "url". For example:

```javascript
ldoc.page('Meatball Stew', 'meatball-stew', ldoc.file()); // still looks for "meatbal-stew.md"
```

In this example, there needs to be a file called `meatball-stew.md` in the same directory as your document's HTML file. ldoc will automatically load this as soon as the user loads the page.
