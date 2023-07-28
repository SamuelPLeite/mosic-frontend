import React from 'react'
import ReactDOM from 'react-dom'

import './Loading.css';

const Loading = props => {
  const content = (
    <div className={`${props.asOverlay && 'loading-spinner__overlay'}`}>
      <div className="lds-dual-ring"></div>
    </div>
  );

  if (props.asOverlay) {
    return ReactDOM.createPortal(content, document.getElementById('loading'))
  } else {
    return content
  }
};

export default Loading
