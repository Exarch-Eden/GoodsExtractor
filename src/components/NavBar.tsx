// third-party libraries
import React from 'react'

// components
import NavLink from './NavLink'


// css
import "../styles/NavBar.css"

const NavBar = () => {
  return (
    <nav className="navBar">
      <NavLink to="/" text="Home" />
      <NavLink to="/search" text="Search" />
      <NavLink to="/about" text="About" />
    </nav>
  )
}

export default NavBar
