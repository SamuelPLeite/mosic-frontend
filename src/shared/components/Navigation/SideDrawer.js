import React, { useRef } from "react"
import ReactDOM from "react-dom"
import { CSSTransition } from "react-transition-group"

import './SideDrawer.css'

const SideDrawer = (props) => {
  const nodeRef = useRef(null)

  const drawer =
    <CSSTransition
      nodeRef={nodeRef}
      in={props.visible}
      timeout={250}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit>
      <aside ref={nodeRef} className="side-drawer" onClick={props.onClick}>{props.children}</aside>
    </CSSTransition>

  return ReactDOM.createPortal(drawer, document.getElementById('side-drawer'))
}

export default SideDrawer