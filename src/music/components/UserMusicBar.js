import React, { useState } from "react"

import {
  RespinIcon, RespinIconFilled,
  LikeIcon, LikeIconFilled
} from "./Icons"
import './UserMusicBar.css'

const UserMusicBar = ({ handleSwitch }) => {
  const [isDisplayLiked, setIsDisplayLiked] = useState(false)
  const handleSwitchPosts = () => {
    handleSwitch(false)
    setIsDisplayLiked(false)
  }

  const handleSwitchLikes = () => {
    handleSwitch(true)
    setIsDisplayLiked(true)
  }

  return (
    <div className="user-music__bar">
      <div className={"post-icon " + (!isDisplayLiked && "active")}
        onClick={handleSwitchPosts}>
        {isDisplayLiked ?
          <RespinIcon /> : <RespinIconFilled />}
      </div>
      <div className={"like-icon " + (isDisplayLiked && "active")}
        onClick={handleSwitchLikes}>
        {!isDisplayLiked ?
          <LikeIcon /> : <LikeIconFilled />}
      </div>
    </div>
  )
}

export default UserMusicBar