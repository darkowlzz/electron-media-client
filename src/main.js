'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({width: 400, height: 400});
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
