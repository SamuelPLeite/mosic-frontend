import React from "react"

import './PageTitle.css'

const PageTitle = ({ image, text }) => {
  const imageUrl = image.includes("uploads/images") ?
    process.env.REACT_APP_BACKEND_URL + image : image

  return (
    <div className="page-title">
      <div className="page-title__image">
        <img src={imageUrl} alt={":o"} />
      </div>
      <span className="page-title__text">
        <span className="page-title__highlight">{text}</span>
        <span> posts</span>
      </span>
    </div>
  )
}

export default PageTitle