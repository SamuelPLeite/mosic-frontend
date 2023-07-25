import React from "react"

import CommentItem from './CommentItem'
import CommentForm from "./CommentForm"
import Card from "../../shared/components/UIElements/Card"
import './CommentList.css'

const CommentList = ({ comments, postId }) => {
  const commentsAux = [...comments]
  commentsAux.reverse()
  return (<>
    <Card className="comment-list__container" >
      <ul className="comment-list">
        <CommentForm key={"comment-form" + postId} postId={postId} />
        {commentsAux.map(comment =>
          <CommentItem
            key={comment._id}
            item={comment}
          />)}
      </ul>
    </Card >
  </>)
}

export default CommentList