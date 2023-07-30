import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"

import Loading from "../../shared/components/UIElements/Loading"
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import InfoPopover from "./InfoPopover"
import {
  RespinIcon, RespinIconFilled, RespinIcon2,
  LikeIcon, LikeIconFilled,
  CommentIcon, CommentIconFilled
} from "./Icons"
import { UserContext } from "../../shared/context/user-context"
import { useAxios } from "../../shared/hooks/http"
import MusicContext from "../../shared/context/music-context"
import './MusicItemActions.css'

const MusicItemActions = ({ item, handleShowComments }) => {
  const auth = useContext(UserContext)
  const [state, dispatch] = useContext(MusicContext)
  const [isRespun, setIsRespun] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isComments, setIsComments] = useState(false)

  const { isLoading, error, sendReq, resetError } = useAxios()

  const respins = state.userRespins
  useEffect(() => {
    if (respins.includes(item.id)) {
      setIsRespun(true)
    } else {
      setIsRespun(false)
    }
  }, [respins, item.id])

  const handleRespin = async (event) => {
    event.preventDefault()
    let response
    if (!isRespun) {
      response = await sendReq(`${process.env.REACT_APP_BACKEND_URL}api/music/respin`, 'post', { musicPost: item.id },
        { Authorization: `bearer ${auth.token}` })
    } else {
      response = await sendReq(`${process.env.REACT_APP_BACKEND_URL}api/music/respin/${item.id}`, 'delete', {},
        { Authorization: `bearer ${auth.token}` })
    }

    if (response) {
      if (state.uid === auth.userId) {
        if (isRespun) {
          dispatch({
            type: "CHANGE_MUSICPOSTS",
            payload: state.musicPosts.filter(m => m.id !== item.id || !m.respinId)
          })
        } else {
          const post = state.musicPosts.find(m => m.id === item.id)
          const respinPost = {
            ...post,
            comments: JSON.parse(JSON.stringify(post.comments)),
            respinId: response.music.respinId
          }
          dispatch({
            type: "CHANGE_MUSICPOSTS",
            payload: [respinPost].concat(state.musicPosts)
          })
        }
      }
      dispatch({
        type: "CHANGE_USERRESPINS",
        payload: isRespun ?
          state.userRespins.filter(p => p !== item.id) :
          state.userRespins.concat(item.id)
      })
      setIsRespun(current => !current)
    }
  }

  useEffect(() => {
    if (item.likes.some(user => user["id"] === auth.userId))
      setIsLiked(true)
    else
      setIsLiked(false)
  }, [state.musicPosts, item.likes, auth.userId])

  const handleLike = async (event) => {
    event.preventDefault()
    const response = await sendReq(`${process.env.REACT_APP_BACKEND_URL}api/music/${item.id}/like`, 'patch',
      { like: !isLiked },
      { Authorization: `bearer ${auth.token}` })

    const userMusicCopy = [...state.musicPosts]
    if (response) {
      if (isLiked) {
        userMusicCopy.forEach(post => {
          if (post.id === item.id) {
            post.likes = post.likes.filter(user => user["id"] !== auth.userId)
          }
        })
      } else {
        userMusicCopy.forEach(post => post.id === item.id && post.likes.unshift({
          id: auth.userId,
          name: auth.username,
          image: auth.image
        }))
      }
      console.log(userMusicCopy)
      dispatch({
        type: "CHANGE_MUSICPOSTS",
        payload: userMusicCopy
      })
      setIsLiked(current => !current)
    }
  }

  const handleComments = (event) => {
    event.preventDefault()
    setIsComments(current => !current)
    handleShowComments()
  }

  return (<>
    {isLoading && <Loading asOverlay />}
    <ErrorModal error={error} onClear={resetError} />
    <ul className="music-item__actions">
      <li className="left"><Link onClick={handleRespin}>
        {!isRespun ? <RespinIcon /> : <RespinIconFilled />}</Link>
      </li>
      <li className="like"><Link onClick={handleLike}>
        {!isLiked ? <LikeIcon /> : <LikeIconFilled />}</Link>
      </li>
      <li className="comment"><Link onClick={handleComments}>
        {!isComments ? <CommentIcon /> : <CommentIconFilled />}</Link>
      </li>
      <li className="right"><InfoPopover item={item} /></li>
    </ul>
  </>)
}

export default MusicItemActions