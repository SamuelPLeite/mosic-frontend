import React, { useState, useContext, useEffect } from "react"
import { Link } from 'react-router-dom'
import Rating from '@mui/material/Rating'
import { CSSTransition } from "react-transition-group"

import Card from "../../shared/components/UIElements/Card"
import Modal from "../../shared/components/UIElements/Modal"
import Button from "../../shared/components/Form/Button"
import Loading from "../../shared/components/UIElements/Loading"
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import CommentList from "./CommentList"
import DotMenu from "../../shared/components/UIElements/DotMenu"
import { RespinIcon, RespinIconFilled, RespinIconGrey, LikeIcon, CommentIcon, InfoIcon } from "./Icons"
import { UserContext } from "../../shared/context/user-context"
import { useAxios } from '../../shared/hooks/http'
import './MusicItem.css'

// title, artist, image, isSong, description, id, creatorId

const MusicItem = ({ item, respins, onDelete, onRespin, onComment }) => {
  const auth = useContext(UserContext)
  const [showDelete, setShowDelete] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [isRespun, setIsRespun] = useState(false)

  const { isLoading, error, sendReq, resetError } = useAxios()

  useEffect(() => {
    if (respins.includes(item.id)) {
      setIsRespun(true)
    } else {
      setIsRespun(false)
    }
  }, [respins, item.id])

  const handleShowDelete = () => {
    setShowDelete(true)
  }

  const handleHideDelete = () => {
    setShowDelete(false)
  }

  const handleDeleteMusic = async () => {
    setShowDelete(false)
    const response = await sendReq(`${process.env.REACT_APP_BACKEND_URL}api/music/${item.id}`, 'delete', {},
      { Authorization: `bearer ${auth.token}` })
    if (response)
      onDelete(item.id)
  }

  const handleRespin = async () => {
    if (!isRespun) {
      const response = await sendReq(`${process.env.REACT_APP_BACKEND_URL}api/music/respin`, 'post', {
        musicPost: item.id
      },
        { Authorization: `bearer ${auth.token}` })
      if (response) {
        onRespin(item.id, isRespun)
        setIsRespun(true)
      }
    } else {
      const response = await sendReq(`${process.env.REACT_APP_BACKEND_URL}api/music/respin/${item.id}`, 'delete', {},
        { Authorization: `bearer ${auth.token}` })
      if (response) {
        onRespin(item.id, isRespun)
        setIsRespun(false)
      }
    }
  }

  const handleShowComments = () => {
    setShowComments(current => !current)
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
        {item.respinId && <div className="respin-tag">
          <RespinIconGrey />
          <span>respun from</span>
        </div>}
        <img src={item.image} alt={item.title} />
        <span>{item.artist}</span>
      </div>
      <Card className="music-item__content">
        {isLoading && <Loading asOverlay />}
        <DotMenu
          labels={["Edit post"]}
          links={[`/music/${item.id}`]}
          onDelete={handleShowDelete}
        />
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
          <li className="left"><Link onClick={handleRespin}>
            {!isRespun ? <RespinIcon /> : <RespinIconFilled />}</Link>
          </li>
          <li className="like"><Link><LikeIcon /></Link></li>
          <li className="comment"><Link onClick={handleShowComments}><CommentIcon /></Link></li>
          <li className="right"><Link onClick={handleShowDelete}><InfoIcon /></Link></li>
        </ul>
      </Card>
      <CSSTransition
        in={showComments}
        timeout={250}
        classNames="slide-down"
        mountOnEnter
        unmountOnExit>
        <CommentList
          comments={item.comments}
          postId={item.id}
          onComment={onComment}
        />
      </CSSTransition>
    </li>
  </>
}

export default MusicItem