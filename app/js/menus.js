// menu
// http://electron.atom.io/docs/v0.34.0/api/menu/
var remote = require('remote');
var Menu = remote.require('menu');
var MenuItem = remote.require('menu-item');

var menu = new Menu();
menu.append(new MenuItem({ label: 'Cut', accelerator: 'CmdOrCtrl+X', role: 'cut' }));
menu.append(new MenuItem({ label: 'Copy', accelerator: 'CmdOrCtrl+C', role: 'copy' }));
menu.append(new MenuItem({ label: 'Paste', accelerator: 'CmdOrCtrl+V', role: 'paste' }));
menu.append(new MenuItem({ type: 'separator' }));
menu.append(new MenuItem({ label: 'Toggle Developer Tools',
  accelerator: (function() {
    if (process.platform == 'darwin')
      return 'Alt+Command+I';
    else
      return 'Ctrl+Shift+I';
  })(),
  click: function(item, focusedWindow) {
    if (focusedWindow)
      focusedWindow.toggleDevTools();
  }
}));

window.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  menu.popup(remote.getCurrentWindow());
}, false);
