import React from "react"

import CommentItem from './CommentItem'
import './CommentList.css'

const CommentList = ({ comments }) => {
  return (
    <ul className="comment-list">
      {comments.map(comment =>
        <CommentItem
          key={comment.id}
          item={comment}
        />)}
    </ul>
  )
}

export default CommentList