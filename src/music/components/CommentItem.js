import React, { useContext, useState } from "react"
import DotMenu from "../../shared/components/UIElements/DotMenu"

import Button from "../../shared/components/Form/Button"
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import Modal from "../../shared/components/UIElements/Modal"
import { UserContext } from "../../shared/context/user-context"
import { useAxios } from '../../shared/hooks/http'
import './CommentItem.css'

const CommentItem = ({ item, onComment }) => {
  const auth = useContext(UserContext)
  const [showDelete, setShowDelete] = useState(false)

  const { error, sendReq, resetError } = useAxios()


  const handleShowDelete = () => {
    setShowDelete(true)
  }

  const handleHideDelete = () => {
    setShowDelete(false)
  }

  const handleDeleteComment = async () => {
    setShowDelete(false)
    const response = await sendReq(`${process.env.REACT_APP_BACKEND_URL}api/music/comment/${item._id}`, 'delete', {},
      { Authorization: `bearer ${auth.token}` })
    if (response) {
      onComment(item, true)
      console.log(response)
    }
  }

  return (<>
    <ErrorModal error={error} onClear={resetError} />
    <Modal
      show={showDelete}
      onCancel={handleHideDelete}
      header="Permanently delete comment"
      footerClass="music-item__modal-actions"
      footer={<><Button inverse onClick={handleHideDelete}>CANCEL</Button>
        <Button danger onClick={handleDeleteComment}>DELETE</Button></>}>
      <p>Confirm deleting comment?</p>
    </Modal>
    <li className="comment-item">
      <div className="comment-item__user">
        <img
          src={process.env.REACT_APP_BACKEND_URL + item.creatorId.image}
          alt={item.creatorId.name}
        />
        <span>{item.creatorId.name}:</span>
      </div>
      {item.content}
      <DotMenu onDelete={handleShowDelete} />
    </li>
  </>)
}

export default CommentItem