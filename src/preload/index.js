import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  saveTimesheet: (data) => {
    // Send the 'save-timesheet' event to the main process
    window.electron.ipcRenderer.send('save-timesheet', data)
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    // Expose the electronAPI to the renderer process securely
    contextBridge.exposeInMainWorld('electron', electronAPI)

    // Expose custom API to the renderer process
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // For non-context isolated environments (less secure)
  window.electron = electronAPI
  window.api = api
}
