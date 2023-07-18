import React, { useState, useContext } from "react"
import { Link } from 'react-router-dom'
import Rating from '@mui/material/Rating'


import Card from "../../shared/components/UIElements/Card"
import Modal from "../../shared/components/UIElements/Modal"
import Button from "../../shared/components/Form/Button"
import Loading from "../../shared/components/UIElements/Loading"
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import Avatar from "../../shared/components/UIElements/Avatar"
import { RespinIcon, LikeIcon, CommentIcon, InfoIcon } from "./Icons"
import { UserContext } from "../../shared/context/user-context"
import { useAxios } from '../../shared/hooks/http'
import './MusicItem.css'

// title, artist, image, isSong, description, id, creatorId

const MusicItem = ({ item, onDelete }) => {
  const auth = useContext(UserContext)
  const [showDelete, setShowDelete] = useState(false)

  const { isLoading, error, sendReq, resetError } = useAxios()

  const handleShowDelete = () => {
    setShowDelete(true)
  }

  const handleHideDelete = () => {
    setShowDelete(false)
  }

  const handleDeleteMusic = async () => {
    setShowDelete(false)
    const response = await sendReq(`http://localhost:3001/api/music/${item.id}`, 'delete', {},
      { Authorization: `bearer ${auth.token}` })
    if (response)
      onDelete(item.id)
  }

  return <>
    <ErrorModal error={error} onClear={resetError} />
    <Modal
      show={showDelete}
      onCancel={handleHideDelete}
      header="Permanently delete post"
      footerClass="music-item__modal-actions"
      footer={<><Button inverse onClick={handleHideDelete}>CANCEL</Button>
        <Button danger onClick={handleDeleteMusic}>DELETE</Button></>}>
      <p>Confirm deleting post?</p>
    </Modal>
    <li className="music-item">
      <div className="music-item__user">
        <img src={item.image} alt={item.title} />
        <span>{item.artist}</span>
      </div>
      <Card className="music-item__content">
        {isLoading && <Loading asOverlay />}
        <div className="music-item__info">
          <div className="music-item__image">
            <img src={item.image} alt={item.title} />
          </div>
          <div className="music-item__track">
            <h2>{item.title}</h2>
            <h3>{item.artist}</h3>
            <Rating name="half-rating" defaultValue={item.rating} precision={0.5} readOnly />
          </div>
        </div>
        <div className="music-item__description">
          <p>{item.description}</p>
        </div>
        <ul className="music-item__actions">
          <li className="left"><Link><RespinIcon /></Link></li>
          <li className="like"><Link><LikeIcon /></Link></li>
          <li className="comment"><Link to={`/music/${item.id}`}><CommentIcon /></Link></li>
          <li className="right"><Link onClick={handleShowDelete}><InfoIcon /></Link></li>
        </ul>
      </Card>
    </li>
  </>
}

export default MusicItem