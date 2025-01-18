import electronLogo from '../assets/images/main-logo.png'
import PropTypes from 'prop-types'

export function MainLogo({ className = '' }) {
  return <img alt="logo" className={className} src={electronLogo} />
}

MainLogo.propTypes = {
  className: PropTypes.string
}
