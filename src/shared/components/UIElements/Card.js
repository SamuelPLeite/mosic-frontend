import React, { forwardRef } from 'react'

import './Card.css'

const Card = forwardRef((props, ref) => {
  return (
    <div ref={ref} className={`card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  )
})

export default Card
