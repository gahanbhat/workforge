import PropTypes from 'prop-types'

const HomeLayout = ({ children }) => {
  return <div>{children}</div>
}

HomeLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default HomeLayout
