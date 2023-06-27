import React, { useContext } from "react"
import { NavLink } from "react-router-dom"

import { UserContext } from "../../context/user-context"
import './NavLinks.css'

const NavLinks = () => {
  const auth = useContext(UserContext)

  return <ul className="nav-links">
    <li>
      <NavLink to="/" ><span>List of Users</span></NavLink>
    </li>
    {auth.isLoggedIn && <li>
      <NavLink to="/users/uid1/music"><span>My Music</span></NavLink>
    </li>}
    {auth.isLoggedIn && <li>
      <NavLink to="/music/new"><span>Post music!</span></NavLink>
    </li>}
    {!auth.isLoggedIn && <li>
      <NavLink to="/login"><span>Log In</span></NavLink>
    </li>}
    {auth.isLoggedIn && <li>
      <button onClick={auth.logout}>Logout</button>
    </li>}
  </ul>
}

export default NavLinks