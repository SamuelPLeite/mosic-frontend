import React from "react"
import { NavLink } from "react-router-dom"

import './NavLinks.css'

const NavLinks = () => {
  return <ul className="nav-links">
    <li>
      <NavLink to="/" exact><span>List of Users</span></NavLink>
    </li>
    <li>
      <NavLink to="/users/uid1/music"><span>My Music</span></NavLink>
    </li>
    <li>
      <NavLink to="/music/new"><span>Post music!</span></NavLink>
    </li>
    <li>
      <NavLink to="/login"><span>Log In</span></NavLink>
    </li>
  </ul>
}

export default NavLinks