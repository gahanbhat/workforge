import { useState } from 'react'

import Tabs from '../components/Tabs'
import { MAINTABS } from '../constants/app-constants'

const Home = () => {
  const [activeTab, setActiveTab] = useState(MAINTABS[0].name)

  return (
    <div>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabList={MAINTABS} />
    </div>
  )
}

export default Home
