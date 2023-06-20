import React from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'

import Backdrop from './Backdrop'
import './Modal.css'

const ModalOL = (props) => {
  const content = <div className={`modal ${props.className}`} style={props.style}>
    <header className={`modal__header ${props.headerClass}`}>
      <h2>{props.header}</h2>
    </header>
    <form onSubmit={props.onSubmit ? props.onSubmit : event => event.preventDefault()}>
      <div className={`modal_content ${props.contentClass}`}>
        {props.children}
      </div>
      <footer className={`modal__footer ${props.footerClass}`}>
        {props.footer}
      </footer>
    </form>
  </div>

  return ReactDOM.createPortal(content, document.getElementById('modal'))
}

const Modal = (props) => {
  return <>
    {props.show && <Backdrop onClick={props.onCancel} />}
    <CSSTransition in={props.show} timeout={250} mountOnEnter unmountOnExit classNames="modal">
      <ModalOL {...props} />
    </CSSTransition>
  </>
}

export default Modal