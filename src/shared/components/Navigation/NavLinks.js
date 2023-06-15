import React from "react"
import { NavLink } from "react-router-dom"

import './NavLinks.css'

const NavLinks = () => {
  return <ul className="nav-links">
    <li>
      <NavLink to="/" exact>List of Users</NavLink>
    </li>
    <li>
      <NavLink to="/users/uid1/music">My Music</NavLink>
    </li>
    <li>
      <NavLink to="/music/new">Post music!</NavLink>
    </li>
    <li>
      <NavLink to="/login">Log In</NavLink>
    </li>
  </ul>
}

export default NavLinks