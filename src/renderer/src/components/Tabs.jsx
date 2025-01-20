import PropTypes from 'prop-types'

const Tabs = ({ tabList, activeTab, setActiveTab }) => {
  return (
    <section className="w-full border-b">
      <nav className="flex p-2 gap-2">
        {tabList.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab((prev) => (prev === tab.name ? prev : tab.name))}
            className={`px-4 py-1 duration-300 rounded ${
              activeTab === tab.name
                ? 'bg-[#800000] text-white'
                : 'text-gray-300 hover:bg-[#800000] hover:text-white'
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
  tabList: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Tabs
