import { app } from 'electron'
import fs from 'fs'
import path from 'path'

class FileService {
  static getUserDataPath() {
    return app.getPath('userData')
  }

  static getSettingsFilePath() {
    return path.join(this.getUserDataPath(), 'settings.json')
  }

  static fileExists(filePath) {
    return fs.existsSync(filePath)
  }

  static readFile(filePath) {
    if (this.fileExists(filePath)) {
      return fs.readFileSync(filePath, 'utf-8')
    }
    return null
  }

  static writeFile(filePath, data) {
    fs.writeFileSync(filePath, data)
  }

  static ensureSettingsFile() {
    const filePath = this.getSettingsFilePath()
    if (!this.fileExists(filePath)) {
      this.writeFile(filePath, JSON.stringify({}))
    }
  }

  static updateSettings(newSettings) {
    const filePath = this.getSettingsFilePath()
    const settings = JSON.parse(this.readFile(filePath))
    const updatedSettings = { ...settings, ...newSettings }
    this.writeFile(filePath, JSON.stringify(updatedSettings, null, 2))
  }
}

export default FileService
