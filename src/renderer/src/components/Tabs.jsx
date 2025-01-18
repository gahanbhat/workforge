import PropTypes from 'prop-types'

const Tabs = ({ tabList, activeTab, setActiveTab }) => {
  return (
    <section className="w-full border-b bg-gray-900">
      <nav className="flex px-1">
        {tabList.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab((prev) => (prev === tab.name ? prev : tab.name))}
            className={`px-4 py-2 duration-300 ${
              activeTab === tab.name
                ? 'bg-[#800000] text-white'
                : 'bg-gray-900 text-gray-300 hover:bg-[#800000] hover:text-white'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </nav>
    </section>
  )
}

Tabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  tabList: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Tabs
