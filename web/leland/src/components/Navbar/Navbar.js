import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './Navbar.scss'

class Navbar extends Component {
  static propTypes = {
    title: PropTypes.string
  }

  render() {
    const { title, onBack } = this.props
    return (
      <nav className="navbar">
        <Link onClick={() => window.history.back()} className="navbar__back" />
        <div className="navbar__title">
          <p className="text">{title}</p>
        </div>
      </nav>
    );
  }
}

export default Navbar;