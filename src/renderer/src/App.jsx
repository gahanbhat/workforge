import { useState, useEffect } from 'react'

import HomeLayout from './layout/default'
import Home from './pages/home'
import Versions from './components/Versions'
import { MainLogo } from './components/Icons'

function App() {
  // const ipcHandle = () => window.electron.ipcRenderer.send('ping')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000) // 2 seconds
    console.log('App loaded')
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <section className="init-app">
        <MainLogo className="logo" />
        <Versions></Versions>
      </section>
    )
  }

  return (
    <HomeLayout>
      <Home />
    </HomeLayout>
  )
}

export default App
