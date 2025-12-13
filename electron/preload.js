// Preload script for Electron
// This script runs before the renderer process is loaded
// It can be used to expose safe APIs to the renderer process

const { contextBridge } = require('electron');

// Expose protected methods that allow the renderer process to use
// ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electron', {
  platform: process.platform
});
