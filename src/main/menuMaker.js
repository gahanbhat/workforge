import { Menu, dialog, app } from 'electron'
import fs from 'fs'
import path from 'path'

class MenuBuilder {
  constructor(mainWindow) {
    this.mainWindow = mainWindow
  }

  buildMenu() {
    if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
      this.setupDevelopmentEnvironment()
    }

    const template = this.buildDefaultTemplate()

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)

    return menu
  }

  setupDevelopmentEnvironment() {
    this.mainWindow.webContents.on('context-menu', (_, props) => {
      const { x, y } = props

      Menu.buildFromTemplate([
        {
          label: 'Inspect element',
          click: () => {
            this.mainWindow.webContents.inspectElement(x, y)
          }
        }
      ]).popup({ window: this.mainWindow })
    })
  }

  buildDefaultTemplate() {
    const templateDefault = [
      {
        label: '&File',
        submenu: [
          {
            label: '&Open Project',
            accelerator: 'Ctrl+O',
            click: () => {
              dialog
                .showOpenDialog({
                  properties: ['openDirectory']
                })
                .then((result) => {
                  if (!result.canceled) {
                    const projectPath = result.filePaths[0]
                    const dataFilePath = path.join(projectPath, 'data.json')
                    if (!fs.existsSync(dataFilePath)) {
                      dialog.showMessageBox({
                        type: 'warning',
                        title: 'Project Error',
                        message: 'This is not a valid project folder. data.json does not exist.',
                        buttons: ['OK']
                      })
                    } else {
                      // Update settings.json with the current project path
                      const settingsPath = path.join(app.getPath('userData'), 'settings.json')
                      const settings = JSON.parse(fs.readFileSync(settingsPath))
                      settings.currentProject = projectPath
                      fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2))
                    }
                  }
                })
                .catch((err) => {
                  console.log(err)
                })
            }
          },
          {
            label: '&New Project',
            accelerator: 'Ctrl+N',
            click: () => {
              dialog
                .showOpenDialog({
                  properties: ['openDirectory']
                })
                .then((result) => {
                  if (!result.canceled) {
                    const projectPath = result.filePaths[0]
                    const dataFilePath = path.join(projectPath, 'data.json')
                    if (!fs.existsSync(dataFilePath)) {
                      fs.writeFileSync(dataFilePath, '{}')
                      // Update settings.json with the current project path
                      const settingsPath = path.join(app.getPath('userData'), 'settings.json')
                      const settings = JSON.parse(fs.readFileSync(settingsPath))
                      settings.currentProject = projectPath
                      fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2))
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
          },
          {
            label: '&Close',
            accelerator: 'Ctrl+W',
            click: () => {
              this.mainWindow.close()
            }
          }
        ]
      },
      {
        label: '&View',
        submenu:
          process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true'
            ? [
                {
                  label: '&Reload',
                  accelerator: 'Ctrl+R',
                  click: () => {
                    this.mainWindow.webContents.reload()
                  }
                },
                {
                  label: 'Toggle &Full Screen',
                  accelerator: 'F11',
                  click: () => {
                    this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen())
                  }
                },
                {
                  label: 'Toggle &Developer Tools',
                  accelerator: 'Alt+Ctrl+I',
                  click: () => {
                    this.mainWindow.webContents.toggleDevTools()
                  }
                }
              ]
            : [
                {
                  label: 'Toggle &Full Screen',
                  accelerator: 'F11',
                  click: () => {
                    this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen())
                  }
                }
              ]
      },
      {
        label: 'Help',
        submenu: [
          {
            label: 'About App',
            click: () => {
              dialog.showMessageBox({
                type: 'info',
                title: 'About App',
                message: 'This is an example app built with Electron.',
                buttons: ['OK']
              })
            }
          }
        ]
      }
    ]

    return templateDefault
  }
}

export { MenuBuilder }
