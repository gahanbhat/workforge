import PropTypes from 'prop-types'
import { MainLogo } from '../components/Icons'

const HomeLayout = ({ children }) => {
  return (
    <section>
      <div className="w-full bg-white">
        <MainLogo className="p-2 w-60" />
      </div>

      {children}
    </section>
  )
}

HomeLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default HomeLayout
