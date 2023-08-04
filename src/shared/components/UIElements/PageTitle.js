import React from "react"

import vinylImg from '../../../images/vinyl.png'
import './PageTitle.css'

const PageTitle = ({ image, text, isUser }) => {
  const imageUrl = image && (image.includes("uploads/images") ?
    process.env.REACT_APP_BACKEND_URL + image : image)

  return (
    <div className="page-title">
      <div className="page-title__image">
        <img src={imageUrl ? imageUrl : vinylImg} alt={"?!"} />
      </div>
      <span className="page-title__text">
        {!isUser && "Discover "}
        <span className="page-title__highlight">
          {text}
        </span>
        <span> posts</span>
      </span>
    </div>
  )
}

export default PageTitle