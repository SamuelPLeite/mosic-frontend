import React, { useEffect, useContext, useState } from "react"
import { useParams } from "react-router-dom"

import MusicList from "../components/MusicList"
import Loading from "../../shared/components/UIElements/Loading"
import MusicContext from "../../shared/context/music-context"
import PageTitle from "../../shared/components/UIElements/PageTitle"
import { useAxios } from "../../shared/hooks/http"
import { UserContext } from "../../shared/context/user-context"
import './UserMusic.css'

const UserMusic = () => {
  const auth = useContext(UserContext)
  const [state, dispatch] = useContext(MusicContext)
  const [loadedMusic, setLoadedMusic] = useState(false)
  const [titleText, setTitleText] = useState(':o')
  const [titleImg, setTitleImg] = useState(null)
  const { isLoading, sendReq } = useAxios()

  const uid = useParams().uid

  useEffect(() => {
    dispatch({
      type: "CHANGE_UID",
      payload: uid
    })
  }, [dispatch, uid])

  useEffect(() => {
    const getUserMusic = async () => {
      setLoadedMusic(false)
      const response = await sendReq(`${process.env.REACT_APP_BACKEND_URL}api/music/user/${uid}`)
      if (response) {
        if (response.error === 404) {
          dispatch({
            type: "CHANGE_MUSICPOSTS",
            payload: []
          })
        } else {
          dispatch({
            type: "CHANGE_MUSICPOSTS",
            payload: response.userMusic
          })
        }
        setLoadedMusic(true) // ALERT ALERT ALERT ALERT
      }
    }
    getUserMusic()
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


  useEffect(() => {
    if (uid === auth.userId) {
      setTitleText(auth.username)
      setTitleImg(auth.image)
    }
    else {
      console.log(state.musicPosts)
      const user = state.musicPosts.find(post => post.creatorId.id === uid)
      if (user) {
        setTitleText(user.creatorId.name)
        setTitleImg(user.creatorId.image)
      }
    }
  }, [uid, auth, state.musicPosts])


  return <>
    {(isLoading || !loadedMusic || !titleImg) ?
      <div className="center"><Loading asOverlay /></div> :
      <div className="page-container">
        <PageTitle text={titleText + "'s"} image={titleImg} />
        <MusicList
          music={state.musicPosts}
          respins={state.userRespins}
        />
      </div>
    }
  </>
}

export default UserMusic