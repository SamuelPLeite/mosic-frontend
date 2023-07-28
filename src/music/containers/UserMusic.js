import React, { useEffect, useContext, useState } from "react"
import { useParams } from "react-router-dom"

import MusicList from "../components/MusicList"
import Loading from "../../shared/components/UIElements/Loading"
import MusicContext from "../../shared/context/music-context"
import { useAxios } from "../../shared/hooks/http"
import { UserContext } from "../../shared/context/user-context"
import './UserMusic.css'

const UserMusic = () => {
  const auth = useContext(UserContext)
  const [state, dispatch] = useContext(MusicContext)
  const [loadedMusic, setLoadedMusic] = useState(false)
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

  return <>
    {(isLoading || !loadedMusic) ?
      <div className="center"><Loading asOverlay /></div> :
      <MusicList
        music={state.musicPosts}
        respins={state.userRespins}
      />
    }
  </>
}

export default UserMusic