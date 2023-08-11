import React from 'react';

import './MainHeader.css'

const MainHeader = props => {
  return <header className={`main-header mui-fixed`}>
    {props.children}
  </header>
}

export default MainHeader