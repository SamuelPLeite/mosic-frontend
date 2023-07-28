import React from "react"
import { Link } from "react-router-dom"

import { LikeIconFilled } from "./Icons"
import './LikesDisplay.css'

const LikeUser = ({ user }) => {
  return (
    <Link className="like-user" to={`/users/${user.id}/music`}>
      <div className="like-user__content">
        <img src={process.env.REACT_APP_BACKEND_URL + user.image} alt={user.name} />
        <span>{user.name}</span>
      </div>
    </Link>
  )
}

const LikesDisplay = ({ likes }) => {
  let content
  const likesNumber = likes.length

  if (likesNumber === 1) {
    content = <>
      <LikeUser user={likes[0]} />
    </>
  } else if (likesNumber === 2) {
    content = <>
      <LikeUser user={likes[0]} />
      <span> and </span>
      <LikeUser user={likes[1]} />
    </>
  } else {
    content = <>
      <LikeUser user={likes[0]} />
      <span>,</span>
      <LikeUser user={likes[1]} />
      <span>{`and ${likesNumber - 2} more users`}&nbsp;</span>
    </>
  }


  return (
    <div className="likes">
      <LikeIconFilled />
      {content}
      <span className="likes__end">liked this!</span>
    </div>
  )
}

export default LikesDisplay