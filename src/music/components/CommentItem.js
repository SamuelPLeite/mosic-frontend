import React from "react"

import './CommentItem.css'

const CommentList = ({ item }) => {
  return (
    <li className="comment-item">
      {item.content} {item.creatorId.name}
    </li>
  )
}

export default CommentList