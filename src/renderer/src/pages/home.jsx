import { useState } from 'react'
import Tabs from '../components/Tabs'
import Form from '../components/Form'
import { MAINTABS } from '../constants/app-constants'

const Home = () => {
  const [activeTab, setActiveTab] = useState(MAINTABS[0].name)

  // Manage editable static data in state
  const [staticData, setStaticData] = useState({
    date: new Date().toISOString().split('T')[0], // Today's date
    term: 'Spring 2025', // Example term
    week: '3' // Example week
  })

  const handleFormSubmit = (data) => {
    console.log('Form Data:', data)

    // Ensure the api is correctly accessed from the preload
    if (window.api && window.api.saveTimesheet) {
      window.api.saveTimesheet(data) // This should now call the exposed function
    } else {
      console.error('saveTimesheet function not found')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabList={MAINTABS} />
      {activeTab === 'Add Records' && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-4">Add Attendance Record</h2>
          <Form onSubmit={handleFormSubmit} staticData={staticData} setStaticData={setStaticData} />
        </div>
      )}
    </div>
  )
}

export default Home
