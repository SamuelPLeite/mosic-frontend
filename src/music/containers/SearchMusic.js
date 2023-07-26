import React, { useEffect, useContext } from "react"
import { useSearchParams } from "react-router-dom"

import MusicList from "../components/MusicList"
import Loading from "../../shared/components/UIElements/Loading"
import MusicContext from "../../shared/context/music-context"
import { useAxios } from "../../shared/hooks/http"
import { UserContext } from "../../shared/context/user-context"

const SearchMusic = () => {
  const auth = useContext(UserContext)
  const [state, dispatch] = useContext(MusicContext)
  const { isLoading, sendReq } = useAxios()

  const [searchParams] = useSearchParams()

  useEffect(() => {
    const getSearchMusic = async () => {
      const queryParams = Object.fromEntries([...searchParams])
      const response = await sendReq(`${process.env.REACT_APP_BACKEND_URL}api/music/search`, 'get', null,
        {}, queryParams)
      if (response) {
        dispatch({
          type: "CHANGE_MUSICPOSTS",
          payload: response.music
        })
        dispatch({
          type: "CHANGE_UID",
          payload: ''
        })
      }
    }
    getSearchMusic()
  }, [sendReq, searchParams, dispatch])

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
  }, [auth.isLoggedIn, auth.token, sendReq, dispatch])

  return <>
    {(isLoading || state.musicPosts.length === 0 || state.uid) ?
      <div className="center"><Loading /></div> :
      <MusicList
        music={state.musicPosts}
        respins={state.userRespins}
      />
    }
  </>
}

export default SearchMusic