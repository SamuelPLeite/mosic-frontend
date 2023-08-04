import React, { useEffect, useContext, useState } from "react"
import { useSearchParams } from "react-router-dom"

import MusicList from "../components/MusicList"
import Loading from "../../shared/components/UIElements/Loading"
import MusicContext from "../../shared/context/music-context"
import PageTitle from "../../shared/components/UIElements/PageTitle"
import { useAxios } from "../../shared/hooks/http"
import { UserContext } from "../../shared/context/user-context"

const SearchMusic = () => {
  const auth = useContext(UserContext)
  const [state, dispatch] = useContext(MusicContext)
  const [titleText, setTitleText] = useState('')
  const [titleImg, setTitleImg] = useState(null)
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

  useEffect(() => {
    setTitleText('')
    const post = state.musicPosts[0]
    if (post) {
      const queryParams = Object.fromEntries([...searchParams])
      if (queryParams.title) {
        setTitleText(queryParams.title)
        if (post.isSong) {
          setTitleImg(post.info.album.cover_medium)
        } else {
          setTitleImg(post.info.cover_medium)
        }
      } else if (queryParams["album.title"]) {
        setTitleText(queryParams["album.title"])
        setTitleImg(post.info.album.cover_medium)
      } else if (queryParams["record.type"]) {
        setTitleText(queryParams["record.type"])
        setTitleImg(post.info.artist.picture_medium)
      } else if (queryParams["artist.name"]) {
        setTitleText(queryParams["artist.name"])
        setTitleImg(post.info.artist.picture_medium)
      } else { // default case
        setTitleText('some')
      }
    }
  }, [searchParams, state.musicPosts])

  return <>
    {(isLoading || !titleText) ?
      <div className="center"><Loading asOverlay /></div> :
      <div className="page-container">
        <PageTitle text={`${titleText}`} image={titleImg} isUser={false} />
        <MusicList
          music={state.musicPosts}
          respins={state.userRespins}
        />
      </div>
    }
  </>
}

export default SearchMusic