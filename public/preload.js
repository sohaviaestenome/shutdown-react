const { contextBridge, ipcRenderer } = require("electron");
console.log('Preload script loaded');

contextBridge.exposeInMainWorld("electron", {
  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  receive: (channel, callback) => {
    ipcRenderer.on(channel, (event, ...args) => callback(...args));
  },
  remove: (channel, callback) => {
    ipcRenderer.removeListener(channel, (event, ...args) => callback(...args));
  },
});