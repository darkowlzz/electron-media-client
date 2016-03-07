'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

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
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
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
