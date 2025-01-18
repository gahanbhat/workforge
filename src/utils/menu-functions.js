import { dialog } from 'electron'
import path from 'path'
import FileService from '../services/file-service'

export function openProject() {
  dialog
    .showOpenDialog({
      properties: ['openDirectory']
    })
    .then((result) => {
      if (!result.canceled) {
        const projectPath = result.filePaths[0]
        const dataFilePath = path.join(projectPath, 'data.json')
        if (!FileService.fileExists(dataFilePath)) {
          dialog.showMessageBox({
            type: 'warning',
            title: 'Project Error',
            message: 'This is not a valid project folder. data.json does not exist.',
            buttons: ['OK']
          })
        } else {
          // Update settings.json with the current project path
          FileService.updateSettings({ currentProject: projectPath })
        }
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

export function newProject() {
  dialog
    .showOpenDialog({
      properties: ['openDirectory']
    })
    .then((result) => {
      if (!result.canceled) {
        const projectPath = result.filePaths[0]
        const dataFilePath = path.join(projectPath, 'data.json')
        if (!FileService.fileExists(dataFilePath)) {
          FileService.writeFile(dataFilePath, '{}')
          // Update settings.json with the current project path
          FileService.updateSettings({ currentProject: projectPath })
        } else {
          dialog.showMessageBox({
            type: 'warning',
            title: 'Project Error',
            message: 'This folder already has a project.',
            buttons: ['OK']
          })
        }
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

export function aboutApp() {
  dialog.showMessageBox({
    type: 'info',
    title: 'About App',
    message: 'This is an example app built with Electron.',
    buttons: ['OK']
  })
}
