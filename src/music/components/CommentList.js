import React, { forwardRef } from "react"

import CommentItem from './CommentItem'
import CommentForm from "./CommentForm"
import Card from "../../shared/components/UIElements/Card"
import './CommentList.css'

const CommentList = forwardRef(({ comments, postId }, ref) => {
  return (<>
    <Card ref={ref} className="comment-list__container" >
      <ul className="comment-list">
        <CommentForm key={"comment-form" + postId} postId={postId} />
        {comments.map(comment =>
          <CommentItem
            key={comment.id}
            item={comment}
          />)}
      </ul>
    </Card >
  </>)
})

export default CommentList