import React, { useEffect, useContext, useState } from "react"
import { useParams } from "react-router-dom"

import MusicList from "../components/MusicList"
import Loading from "../../shared/components/UIElements/Loading"
import MusicContext from "../../shared/context/music-context"
import PageTitle from "../../shared/components/UIElements/PageTitle"
import { useAxios } from "../../shared/hooks/http"
import { UserContext } from "../../shared/context/user-context"
import './UserMusic.css'
import UserMusicBar from "../components/UserMusicBar"

const UserMusic = () => {
  const auth = useContext(UserContext)
  const [state, dispatch] = useContext(MusicContext)
  const [loadedMusic, setLoadedMusic] = useState(false)
  const [isDisplayLiked, setIsDisplayLiked] = useState(false)

  const { isLoading, sendReq } = useAxios()

  const uid = useParams().uid

  useEffect(() => {
    dispatch({
      type: "CHANGE_UID",
      payload: uid
    })
    setLoadedMusic(false)
    setIsDisplayLiked(false)
  }, [dispatch, uid])

  useEffect(() => {
    const getUserMusic = async () => {
      const response = await sendReq(`${process.env.REACT_APP_BACKEND_URL}api/music/user/${uid}`)
      if (response) {
        dispatch({
          type: "CHANGE_MUSICPOSTS",
          payload: response.userMusic.posts
        })
        dispatch({
          type: "CHANGE_USER",
          payload: {
            username: response.userMusic.name,
            image: response.userMusic.image
          }
        })
        setLoadedMusic(true) // ALERT ALERT ALERT ALERT (REAL ALERT)
      }
    }
    const getUserLikedPosts = async () => {
      const response = await sendReq(`${process.env.REACT_APP_BACKEND_URL}api/music/user/likes/${uid}`)
      if (response) {
        dispatch({
          type: "CHANGE_LIKEDPOSTS",
          payload: response.userMusic.postsLiked
        })
      }
    }
    getUserMusic()
    getUserLikedPosts()
  }, [sendReq, uid, dispatch])

  useEffect(() => {
    const getUserRespins = async () => {
      const response = await sendReq(`${process.env.REACT_APP_BACKEND_URL}api/music/respin`, 'get', {},
        {
          Authorization: `bearer ${auth.token}`
        })
      if (response) {
        dispatch({
          type: "CHANGE_USERRESPINS",
          payload: response.respinPosts
        })
      }
    }
    if (auth.isLoggedIn)
      getUserRespins()
  }, [auth.isLoggedIn, auth.token, sendReq, uid, dispatch])

  const handleSwitchDisplay = (mode) => {
    setIsDisplayLiked(mode)
  }

  return <>
    {(isLoading || !loadedMusic) ?
      <div className="center"><Loading asOverlay /></div> :
      <div className="page-container">
        <PageTitle text={state.user.username + "'s"} image={state.user.image} isUser={true} />
        <UserMusicBar handleSwitch={handleSwitchDisplay} />
        <MusicList
          music={isDisplayLiked ? state.likedPosts : state.musicPosts}
          respins={state.userRespins}
        />
      </div >
    }
  </>
}

export default UserMusic