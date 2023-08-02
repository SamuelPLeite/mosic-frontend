import React, { useState } from 'react';
import './HoverPopup.css'

const HoverPopup = ({ children, tooltip }) => {
  const [showTooltip, setShowTooltip] = useState(false)

  const handleMouseEnter = () => {
    setShowTooltip(true)
  }

  const handleMouseLeave = () => {
    setShowTooltip(false)
  }

  return (
    <span className="hover-popup-wrapper" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {' '}<b>{children}</b>{' '}
      {showTooltip && <div className="hover-popup">{tooltip}</div>}
    </span>
  )
}

export default HoverPopup