document.addEventListener('DOMContentLoaded', function() {

  const request = require('request');
  const storage = require('electron-json-storage');
  const ipcRenderer = require('electron').ipcRenderer;
  //const volUp = document.getElementById('vol-up');
  //const volDown = document.getElementById('vol-down');
  const host = document.getElementById('host');
  const port = document.getElementById('port');

  var slider = document.getElementById('slider');
  var status = document.getElementById('status');
  var mute = document.getElementById('mute');

  const STORAGE_KEY = 'media';
  const UP_ENDPOINT = '/vol/up';
  const DOWN_ENDPOINT = '/vol/down';

  var MUTE = false;

  // fetch the app variables and set in the app
  storage.get(STORAGE_KEY, function(error, data) {
    host.value = !! data.host ? data.host : 'localhost';
    port.value = !! data.port ? data.port : 7000;
  });

  setInterval(getCurrentVolume, 1000);

  function getEndpoint() {
    var HOST = host.value;
    var PORT = parseInt(port.value);
    return 'http://' + HOST + ':' + PORT;
  }

  // NOTE: To be used in future features
  function getVolUpEndpoint() {
    return getEndpoint() + UP_ENDPOINT;
  }

  function getVolDownEndpoint() {
    return getEndpoint() + DOWN_ENDPOINT;
  }

  function getCurrentVolume() {
    request(getEndpoint() + '/vol', (err, res, body) => {
      slider.value = parseInt(body);
      status.textContent = body;
    });
  };

  slider.addEventListener('change', () => {
    request(getEndpoint() + '/vol/set?vol=' + slider.value, () => {
      status.textContent = slider.value;
      saveData();
    });
  });

  mute.addEventListener('click', () => {
    MUTE = ! MUTE;
    if (MUTE == true) {
      request(getEndpoint() + '/vol/mute', () => {});
    } else {
      request(getEndpoint() + '/vol/unmute', () => {});
    }
  });

  // Save app data
  function saveData() {
    storage.set(STORAGE_KEY,
      {
        'host': host.value,
        'port': port.value
      }
    );
  }

  ipcRenderer.on('vol-up', (event, arg) => {
    request(getVolUpEndpoint(), () => {

    });
  });

  ipcRenderer.on('vol-down', (event, arg) => {
    request(getVolDownEndpoint(), () => {

    });
  });
});
