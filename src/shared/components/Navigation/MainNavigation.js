import React, { useState } from "react";
import { Link } from "react-router-dom";

import './MainNavigation.css';
import MainHeader from "./MainHeader";
import SideDrawer from "./SideDrawer";
import NavLinks from "./NavLinks";
import Backdrop from "../UIElements/Backdrop";

const MainNavigation = () => {
  const [drawerDisplay, setDrawerDisplay] = useState(false)

  const handleOpenDrawer = () => {
    setDrawerDisplay(true)
  }

  const handleCloseDrawer = () => {
    setDrawerDisplay(false)
  }

  return (
    <>
      {drawerDisplay && <Backdrop onClick={handleCloseDrawer} />}
      <SideDrawer visible={drawerDisplay} onClick={handleCloseDrawer}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>
      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={handleOpenDrawer}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">Mosic</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  )
}

export default MainNavigation