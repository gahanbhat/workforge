import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import fs from 'fs'
import { promises as fsPromises } from 'fs'

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, '..', 'preload', 'index.js'), // Link to preload script
      nodeIntegration: false, // Disable nodeIntegration for security
      contextIsolation: true // Enable context isolation for security
    }
  })

  mainWindow.loadFile('index.html')

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })
}

ipcMain.on('save-timesheet', async (event, data) => {
  const filePath = path.join(app.getPath('userData'), 'timesheets.csv')
  const csvData = [
    'Date,Term,Week,Name,In Time,Out Time,Break',
    `${data.date},${data.term},${data.week},${data.name},${data.inTime},${data.outTime},${data.break}`
  ].join('\n')

  try {
    await fsPromises.access(filePath)
    await fsPromises.appendFile(filePath, csvData + '\n')
    event.reply('timesheet-saved', 'Data saved successfully')
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fsPromises.writeFile(filePath, csvData + '\n')
      event.reply('timesheet-saved', 'File created and data saved')
    } else {
      console.error('Error saving timesheet data:', err)
      event.reply('timesheet-saved', 'Error saving data')
    }
  }
})

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
