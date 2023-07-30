import React, { useState, useContext } from "react"
import Rating from '@mui/material/Rating'
import { Link } from "react-router-dom"
import { CSSTransition } from "react-transition-group"

import MusicItemActions from "./MusicItemActions"
import Card from "../../shared/components/UIElements/Card"
import Modal from "../../shared/components/UIElements/Modal"
import Button from "../../shared/components/Form/Button"
import Loading from "../../shared/components/UIElements/Loading"
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import CommentList from "./CommentList"
import DotMenu from "../../shared/components/UIElements/DotMenu"
import LikesDisplay from "./LikesDisplay"
import AudioPlayer from "./AudioPlayer"
import { RespinIconGrey } from "./Icons"
import vinylImg from '../../images/vinyl.png'
import { UserContext } from "../../shared/context/user-context"
import MusicContext from "../../shared/context/music-context"
import { useAxios } from '../../shared/hooks/http'
import './MusicItem.css'

// title, artist, image, isSong, description, id, creatorId

const MusicItem = ({ item }) => {
  const auth = useContext(UserContext)
  const [state, dispatch] = useContext(MusicContext)
  const [showDelete, setShowDelete] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const { isLoading, error, sendReq, resetError } = useAxios()

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
    if (response) {
      dispatch({
        type: "CHANGE_MUSICPOSTS",
        payload: state.musicPosts.filter(m => m.id !== item.id)
      })
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
        <Link to={`/users/${item.creatorId.id}/music`}>
          <img src={process.env.REACT_APP_BACKEND_URL + item.creatorId.image} alt={item.creatorId.name} />
          <span>{item.creatorId.name}</span>
        </Link>
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
            <img src={item.image} alt={item.title} className="cover" />
            <img src={vinylImg} alt="" className={`vinyl ${isPlaying && 'vinyl__playing'}`} />
            {item.info.preview &&
              <AudioPlayer audioUrl={item.info.preview} handlePlaying={setIsPlaying} />
            }
          </div>
          <div className="music-item__track">
            <h2>{item.title}</h2>
            <h3>{item.artist}</h3>
            <Rating name="half-rating" defaultValue={item.rating} precision={0.5} readOnly />
          </div>
        </div>
        {item.likes.length > 0 && <LikesDisplay likes={item.likes} />}
        <div className="music-item__description">
          <p>{item.description}</p>
        </div>
        <MusicItemActions item={item} handleShowComments={handleShowComments} />
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
        />
      </CSSTransition>
    </li>
  </>
}

export default MusicItem