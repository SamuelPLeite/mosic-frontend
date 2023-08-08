import React from 'react'
import ReactDOM from 'react-dom'

import { RespinSymbol } from '../../../music/components/Icons';
import './Loading.css';

const Loading = props => {
  const content = (
    <div className={`${props.asOverlay && 'loading-spinner__overlay'}`}>
      {props.asOverlay ?
        <div className="spin-loading">
          <RespinSymbol />
        </div> :
        <div className="lds-dual-ring"></div>}
    </div>
  );

  if (props.asOverlay) {
    return ReactDOM.createPortal(content, document.getElementById('loading'))
  } else {
    return content
  }
};

export default Loading
