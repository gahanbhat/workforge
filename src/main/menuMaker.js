import { Menu } from 'electron'
import { openProject, newProject, aboutApp } from '../utils/menu-functions'

class MenuBuilder {
  constructor({ mainWindow, setMenuVisibilityAlways = true }) {
    this.mainWindow = mainWindow
    if (setMenuVisibilityAlways) {
      this.menuVisibleAlways()
    }
  }

  menuVisibleAlways() {
    this.mainWindow.setAutoHideMenuBar(false)
    this.mainWindow.setMenuBarVisibility(true)
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
            click: () => openProject()
          },
          {
            label: '&New Project',
            accelerator: 'Ctrl+N',
            click: () => newProject()
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
            click: () => aboutApp()
          }
        ]
      }
    ]

    return templateDefault
  }
}

export { MenuBuilder }
