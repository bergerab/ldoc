!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.l=e():t.l=e()}(this,function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=3)}([function(t,e){var n=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","label","legend","li","ul","link","main","map","mark","menu","menuitem","meta","meter","nav","object","ol","optgroup","option","output","p","param","pre","progress","q","s","samp","script","section","select","small","source","span","noscript","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","title","tr","track","u","var","video","wbr"]),r=new Set(["META","BR","IMG","INPUT","HR"]);Object.assign(t.exports,{TAGS:n,SELF_CLOSING_NODE_NAMES:r})},function(t,e,n){(function(e){var r=n(2).Document,o=e,i=null,u=u||null,a=null,c=null,l=!1,f=function(t){void 0===(o=t)||void 0===o.document?(i=new r,l=!0):(i=o.document,l=!1),void 0!==o&&(u=o.Proxy,a=o.HTMLDocument,c=o.Element)};f(o),Object.assign(t.exports,{initializeWindow:f,window:o,document:i,Proxy:u,HTMLDocument:a,Element:c,isUsingProxyDocument:function(){return l},supportsProxy:function(){return"function"==typeof u}})}).call(this,n(8))},function(t,e,n){function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function u(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}var a=n(0).SELF_CLOSING_NODE_NAMES,c=function(){function t(){o(this,t)}return u(t,[{key:"createTextNode",value:function(t){var e=new f(this,"#text",3).getProxy();return e.nodeValue=t,e}},{key:"createElement",value:function(t){if("string"!=typeof t)throw new Error("Tag can not be numbers");return new f(this,t,1).getProxy()}}]),t}(),l=0,f=function(){function t(e,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:3;if(o(this,t),!n)throw new Error("You must specify a `tagName`");this.id=++l,this.content="",this.node=new b(n,r)}return u(t,[{key:"escape",value:function(t){return t.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}},{key:"outerHTML",value:function(){if(this.node.isTextNode())return this.content;for(var t=this.node.tagName.toLowerCase(),e=Object.keys(this.node.attributes),n=e.length>0?" ":"",r=0;r<e.length;++r){var o=e[r],i=this.node.attributes[o];n+=null===i?"".concat(o.toLowerCase()):"".concat(o.toLowerCase(),'="').concat(i,'"'),r!==e.length-1&&(n+=" ")}var u="<".concat(t).concat(n,">");if(!a.has(this.node.nodeName)){u+=this.escape(this.content);var c=!0,l=!1,f=void 0;try{for(var s,d=this.node.children[Symbol.iterator]();!(c=(s=d.next()).done);c=!0){u+=s.value.outerHTML()}}catch(t){l=!0,f=t}finally{try{c||null==d.return||d.return()}finally{if(l)throw f}}u+="</".concat(t,">")}return u}},{key:"setAttribute",value:function(t,e){this.node.attributes[t]=""===e?null:e}},{key:"removeAttribute",value:function(t){delete this.node.attributes[t]}},{key:"hasId",value:function(t){if(this.id===t)return!0;var e=!0,n=!1,r=void 0;try{for(var o,i=this.node.children[Symbol.iterator]();!(e=(o=i.next()).done);e=!0){if(o.value.hasId(t))return!0}}catch(t){n=!0,r=t}finally{try{e||null==i.return||i.return()}finally{if(n)throw r}}return!1}},{key:"appendChild",value:function(t){if(null!=t){var e=m.get(t);if(this.hasId(e.id)||e.hasId(this.id))throw new Error("You can't append a child which contains its parent.");var n=!0,r=!1,o=void 0;try{for(var i,u=this.node.children[Symbol.iterator]();!(n=(i=u.next()).done);n=!0){var a=i.value;if(e.id===a.id)return}}catch(t){r=!0,o=t}finally{try{n||null==u.return||u.return()}finally{if(r)throw o}}this.node.children.push(e)}}},{key:"getProxy",value:function(){var t=this,e=new Proxy(this,{get:function(e,n){return"outerHTML"===n?t.outerHTML():"appendChild"===n?t.appendChild:y.has(n)?t.node.isElementNode()?t.content.toString():void 0:h.has(n)?t.node.isTextNode()?t.content.toString():void 0:n in e&&"id"!==n?e[n]:e.node[n]},set:function(e,n,o){if(n in v)throw new Error("You can't set ".concat(n," on nodes"));return"object"===r(o)||"function"==typeof o||p.has(n)?y.has(n)&&t.node.isElementNode()||h.has(n)&&t.node.isTextNode()?t.content=o.toString():e.node[n]=o:(e.node.attributes[n]=o,e.node[n]=o),o}});return m.set(e,this),e}}]),t}(),s=1,d=3,p=new Set(["innerHTML","textContent","isContentEditable","nodeValue"]),y=new Set(["innerHTML","textContent","innerText"]),h=new Set(["textContent","nodeValue"]),v=new Set(["attributes","nodeName","children","outerHTML","setAttribute","removeAttribute"]),m=new Map,b=function(){function t(){var e=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"#text",r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:d;if(o(this,t),1!==r&&3!==r)throw new Error("Only type of ELEMENT_NODE (".concat(s,") and TEXT_NODE (").concat(d,") are supported"));this.attributes={},this.children=[],this.type=r,this.tagName=n.toUpperCase(),this.style=new Proxy({},{set:function(t,n,r){var o=n.replace(/([A-Z])/g,"-$1").toLowerCase(),i="".concat(o,": ").concat(r,";");null!=e.attributes.style?e.attributes.style+=" "+i:e.attributes.style=i,t[n]=r}}),this.dataset=new Proxy({},{set:function(t,n,r){var o="data-"+n.replace(/([A-Z])/g,"-$1").toLowerCase();e.attributes[o]=r,t[n]=r}})}return u(t,[{key:"isTextNode",value:function(){return this.type===d}},{key:"isElementNode",value:function(){return this.type===s}}]),t}();Object.assign(t.exports,{Element:f,Document:c,isElement:function(t){return m.has(t)}})},function(t,e,n){t.exports=n(4)},function(t,e,n){var r=n(5).l;n(10),t.exports=r},function(t,e,n){function r(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function o(t,e,n){return(o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}()?Reflect.construct:function(t,e,n){var r=[null];r.push.apply(r,e);var o=new(Function.bind.apply(t,r));return n&&i(o,n.prototype),o}).apply(null,arguments)}function i(t,e){return(i=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function u(t){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function a(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var c=n(6),l=c.RESERVED_KEYS,f=c.FORCED_PROP_KEYS,s=c.ALIAS_KEYS,d=n(7),p=d.setProps,y=d.setAttrs,h=d.appendChildren,v=d.isElement,m=d.setChildren,b=n(1),g=b.document,w=b.supportsProxy,E=n(9),S=E._eval,A=E._with,x=n(0).TAGS,_=function(){function t(e){for(var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2?arguments[2]:void 0,o=arguments.length,i=new Array(o>3?o-3:0),a=3;a<o;a++)i[a-3]=arguments[a];!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),n=I(n),r=I(r);var c=v(r),l=v(n),f=(u(r),u(n)),s={};l||(s=c||"object"!==u(r)&&void 0!==r?"object"===u(n)?n:{}:r||n),Array.isArray(n)?void 0===r?s={children:n}:s.children=n:l?void 0===r?s={children:[n]}:s.children=[n]:"object"!==f&&(void 0===r?s={props:{textContent:s}}:(s.props=s.props||{},s.props.textContent=n));var d=c||"object"!==u(r)&&void 0!==r;(d||i.length>0)&&(d&&(i=[r].concat(i)),void 0!==s.children?s.children=s.children.concat(i):s.children=i),this.name="number"==typeof e?e.toString():e,this.children=k(s.children)||[],this.props=s.props||{},this.attrs=s.attrs||{},this.inferAttrsAndProps(s)}var e,n,r;return e=t,(n=[{key:"inferAttrsAndProps",value:function(t){for(var e in t){var n=t[e];if(void 0!==s[e]&&(e=s[e]),!l.has(e)&&void 0!==n){var r=u(n);"object"===r||"function"===r||f.has(e)?this.props[e]=n:this.attrs[e]=n}}}},{key:"render",value:function(){var t=g.createElement(this.name);return p(t,this.props),y(t,this.attrs),this.children.length>0&&h(t,this.children),t}}])&&a(e.prototype,n),r&&a(e,r),t}(),j=new Set,C=new Set,T=function(t){return"function"==typeof t&&j.has(t)},O=function(t){return"function"==typeof t&&C.has(t)},P=function(t){return"object"===u(t)&&t instanceof _},N=function(t){var e=function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return o(_,[t].concat(n))};return C.add(e),e},L=function(t){var e=function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return o(_,[t].concat(n)).render()};return j.add(e),e},M=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return 0===e.length?null:"string"==typeof e[0]||"number"==typeof e[0]?o(_,r(e)).render():(e=k(e),h.apply(void 0,r(e)),e[0])},k=function(t){if(Array.isArray(t)){for(var e=0;e<t.length;++e)t[e]=I(t[e],function(t){return"string"==typeof t?g.createTextNode(t):"number"==typeof t?g.createTextNode(t.toString()):t});return t}},I=function t(e,n){return O(e)?e().render():T(e)?e():P(e)?e.render():"function"==typeof e?t(S(e,M)):void 0===n||v(e)?e:n(e)};M.str=function(){var t=M.apply(void 0,arguments);return v(t)?t.outerHTML:""},M.pstr=function(){var t=M.apply(void 0,arguments);if(v(t)){for(var e=[t];e.length>0;)e.pop();return t.outerHTML}return""},M.nodify=k,M.normalize=I,M.with=function(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];if(1===n.length&&"function"==typeof n[0])return I(A(t,n[0],M));for(var o=0;o<n.length;++o){var i=n[o];"function"==typeof i&&(n[o]=I(A(t,i,M)))}return M.apply(void 0,n)},M.import=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window,e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=!0,r=!1,o=void 0;try{for(var i,u=x.values()[Symbol.iterator]();!(n=(i=u.next()).done);n=!0){var a=i.value;(e||void 0===t[a])&&(t[a]=M[a])}}catch(t){r=!0,o=t}finally{try{n||null==u.return||u.return()}finally{if(r)throw o}}return t},M.perf=function(){var t=performance.now(),e=M.apply(void 0,arguments);return console.log(performance.now()-t),e},M.set=function(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];m(t,k(n))},M.isIElement=P,Object.assign(t.exports,{IElement:_,isIElement:P,isElementGenerator:T,isIElementGenerator:O,createElementGenerator:L,createIElementGenerator:N,l:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return w()&&e?function(t){var e={};return new Proxy(t,{get:function(t,n){return n in e?e[n]:x.has(n)?e[n]=L(n):n.startsWith("_")?e[n]=N(n.substring(3)):t[n]}})}(t):function(t){var e=!0,n=!1,r=void 0;try{for(var o,i=x.values()[Symbol.iterator]();!(e=(o=i.next()).done);e=!0){var u=o.value;t[u]=L(u),t["_"+u]=N(u)}}catch(t){n=!0,r=t}finally{try{e||null==i.return||i.return()}finally{if(n)throw r}}return t}(t)}(M)})},function(t,e){var n=new Set(["children","props","attrs"]),r=new Set(["innerHTML","innerText","outerHTML","textContent","hidden","dataset","isContentEditable"]);Object.assign(t.exports,{RESERVED_KEYS:n,FORCED_PROP_KEYS:r,ALIAS_KEYS:{html:"innerHTML",text:"textContent"}})},function(t,e,n){function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var o=n(1),i=o.isUsingProxyDocument,u=o.Element,a=o.HTMLDocument,c=n(2),l=function(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];return n.flat().forEach(function(e){return t.appendChild(e)}),t},f=function(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];return n.flat().forEach(function(e){return t.insertAdjacentElement("afterBegin",e)}),t},s=function(t,e,n){if("object"===r(n))if("object"===r(t[e]))for(var o in n)t[e][o]=n[o];else t[e]=n;else t[e]=n;return t},d=function(t,e,n){return null!==n&&""!==n&&(!1===n?t.removeAttribute(e):(!0===n&&(n=""),t.setAttribute(e,n))),t},p=function(t){for(;null!==t.firstChild;)t.firstChild.remove();return t};Object.assign(t.exports,{isElement:function(t){return i()?c.isElement(t):null!=u&&null!=a&&(t instanceof u||t instanceof a)},appendChildren:l,appendBody:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return l.apply(void 0,[document.body].concat(e))},prependChild:f,prependBody:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return f.apply(void 0,[document.body].concat(e))},insertChildAfter:function(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];return n.flat().forEach(function(e){return t.insertAdjacentElement("afterEnd",e)}),t},insertChildBefore:function(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];return n.flat().forEach(function(e){return t.insertAdjacentElement("beforeBegin",e)}),t},setProp:s,setProps:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};for(var n in e)s(t,n,e[n]);return t},setAttr:d,setStyle:function(t,e){return s(t,"style",e)},setAttrs:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};for(var n in e)d(t,n,e[n]);return t},addChildren:function(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];return l.apply(void 0,[t].concat(n)),t},removeAttr:function(t,e){return t.removeAttribute(e),t},removeAttrs:function(t){for(;t.attributes.length>0;)t.removeAttributeNode(t.attributes[0]);return t},removeChildren:p,remove:function(t){return t.remove(),t},removeClass:function(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];return n.forEach(function(e){return t.classList.remove(e)}),t},addClass:function(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];return n.forEach(function(e,n){return t.className+=(0===t.className.length?"":" ")+e}),t},addId:function(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];return n.forEach(function(e,n){return t.id+=(0===t.id.length?"":" ")+e}),t},selectByClass:function(t){return document.getElementsByClassName(t)},selectById:function(t){return document.getElementById(t)},selectFirst:function(t){return document.querySelector(t)},selectAll:function(t){return document.querySelectorAll(t)},setChildren:function(t){p(t);for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];return l.apply(void 0,[t].concat(n)),t}})},function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){function r(t,e,n){return(r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}()?Reflect.construct:function(t,e,n){var r=[null];r.push.apply(r,e);var i=new(Function.bind.apply(t,r));return n&&o(i,n.prototype),i}).apply(null,arguments)}function o(t,e){return(o=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function i(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=[],r=!0,o=!1,i=void 0;try{for(var u,a=t[Symbol.iterator]();!(r=(u=a.next()).done)&&(n.push(u.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==a.return||a.return()}finally{if(o)throw i}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var u=n(0).TAGS,a=function(){var t,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{var:"_var"},n={},r=!0,o=!1,a=void 0;try{for(var c,l=u.values()[Symbol.iterator]();!(r=(c=l.next()).done);r=!0){var f=c.value,s=f;f in e&&(f=e[f]),n[f]="l."+s}}catch(t){o=!0,a=t}finally{try{r||null==l.return||l.return()}finally{if(o)throw a}}return t=n,"var ".concat(Object.entries(t).map(function(t){var e=i(t,2),n=e[0],r=e[1];return"".concat(n,"=").concat(r)}).join(","),";")}();t.exports={_eval:function(t,e){return t="".concat(a,";return (").concat(t,")();"),new Function("l",t)(e)},_with:function(t,e,n){e="return (".concat(e,")();");var o=["l","__data"],i=!1;for(var u in t)"this"!==u?(o.push(u),e="".concat(u,"=__data.").concat(u,";\n")+e):i=!0;return e=a+e,o.push(e),i?r(Function,o).bind(t.this)(n,t):r(Function,o)(n,t)}}},function(t,e){void 0===Array.prototype.flat&&(Array.prototype.flat=function(){for(var t=[],e=0;e<this.length;++e){var n=this[e];Array.isArray(n)?t=t.concat(n):t.push(n)}return t})}])});