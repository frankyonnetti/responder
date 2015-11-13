
#### TODO:


#### Documentation

* [Chrome `webview tag`](https://developer.chrome.com/apps/tags/webview)
* [Electron `webview tag`](https://github.com/atom/electron/blob/master/docs/api/web-view-tag.md)


#### Article on tiny-lr

* [Live reloading using Grunt.JS task runner](http://joebuckle.me/live-reloading-using-grunt-js-task-runner)
* [tiny-lr](http://localhost:35729)


#### Electron app

* [Electron](http://electron.atom.io)
* [Broswer window settings](https://github.com/atom/electron/blob/master/docs/api/browser-window.md)
* [webview tag](https://developer.chrome.com/apps/tags/webview)
* [Awesome Electron](https://github.com/sindresorhus/awesome-electron)


* $ npm start


#### mixin jQuery

https://discuss.atom.io/t/solved-how-to-get-urls-href-for-the-link-when-mouse-hovers-over-it-from-the-page-rendered-in-the-webview/20280

var $ = require('jquery');

$('body').on('mouseenter', 'a', function() {
  updateStatusBarURL(this.href);
});

$('body').on('mouseleave', 'a', function() {
  clearStatusBarURL();
});
