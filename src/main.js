'use strict';

const debug = require('debug')('main');
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const globalShortcut = electron.globalShortcut;

const SHORTCUT_VOL_UP = 'VolumeUp';
const SHORTCUT_VOL_DOWN = 'VolumeDown';

let mainWindow;
let webContents;

function createWindow () {
  mainWindow = new BrowserWindow({
    'title-bar-style': 'hidden',
    width: 250,
    height: 350,
    'min-width': 250,
    'min-height': 300,
    'accept-first-mouse': true
  });
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  webContents = mainWindow.webContents;
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  var volUpShortcut = globalShortcut.register(SHORTCUT_VOL_UP, () => {
    debug(SHORTCUT_VOL_UP + ' is pressed');
    webContents.send('vol-up', true);
  });

  if (!volUpShortcut) {
    debug(SHORTCUT_VOL_UP + ' shortcut registration failed');
  }

  var volDownShortcut = globalShortcut.register(SHORTCUT_VOL_DOWN, () => {
    debug(SHORTCUT_VOL_DOWN + ' is pressed');
    webContents.send('vol-down', true);
  });

  if (!volDownShortcut) {
    debug(SHORTCUT_VOL_DOWN + ' shortcut registration failed');
  }
}

app.on('ready', createWindow);

// Quit app on all windows close
app.on('window-all-closed', () => {
  // not for OS X
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Recreate a window when the app is activated on OS X
app.on('activate', () => {
  if (mainWindow == null) {
    createWindow();
  }
});

app.on('will-quit', () => {
  globalShortcut.unregister(SHORTCUT_VOL_UP);
  globalShortcut.unregister(SHORTCUT_VOL_DOWN);
  globalShortcut.unregisterAll();
});
