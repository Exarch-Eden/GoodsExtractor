// third-party libraries
import React from 'react'
import { Link } from 'react-router-dom'
import NavLink from './NavLink'

// components


// css
import "../styles/NavBar.css"

const NavBar = () => {
  return (
    <nav className="navBar">
      <NavLink to="/" text="Home" />
      <NavLink to="/about" text="About" />
    </nav>
  )
}

export default NavBar
