import React, { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"

import MusicList from "../components/MusicList"
import Loading from "../../shared/components/UIElements/Loading"
import { useAxios } from "../../shared/hooks/http"
import { UserContext } from "../../shared/context/user-context"
import './UserMusic.css'

const UserMusic = () => {
  const auth = useContext(UserContext)
  const [userMusic, setUserMusic] = useState([])
  const [respinPosts, setRespinPosts] = useState([])
  const { isLoading, sendReq } = useAxios()

  const uid = useParams().uid

  useEffect(() => {
    const getUserMusic = async () => {
      const response = await sendReq(`${process.env.REACT_APP_BACKEND_URL}api/music/user/${uid}`)
      if (response)
        setUserMusic(response.userMusic)
    }
    getUserMusic()
  }, [sendReq, uid])

  useEffect(() => {
    const getUserRespins = async () => {
      const response = await sendReq(`${process.env.REACT_APP_BACKEND_URL}api/music/respin`, 'get', {},
        {
          Authorization: `bearer ${auth.token}`
        })
      if (response) {
        setRespinPosts(response.respinPosts)
      }
    }
    if (auth.isLoggedIn)
      getUserRespins()
  }, [auth.isLoggedIn, auth.token, sendReq, uid])

  const handleDeleteMusic = (mId) => {
    setUserMusic((currentMusic) => currentMusic.filter(m => m.id !== mId))
  }

  const handleRespin = (mId, isRespun) => {
    if (uid === auth.userId) {
      if (isRespun) {
        setUserMusic((currentMusic) => currentMusic.filter(m => m.id !== mId || !m.respinId))
      } else {
        const post = userMusic.find(m => m.id === mId)
        const respinPost = { ...post, respinId: true }
        setUserMusic((currentMusic) => [respinPost].concat(currentMusic))
      }
    }
    setRespinPosts((current) => isRespun ? current.filter(p => p !== mId) : current.concat(mId))
  }

  const handleComment = (comment, isDelete) => {
    if (!isDelete) {
      const userMusicCopy = [...userMusic]
      userMusicCopy.forEach(post => post.id === comment.musicPost && post.comments.push(comment))
      setUserMusic(userMusicCopy)
      console.log(userMusicCopy)
      console.log("Called handle comment!")
    } else {
      const userMusicCopy = [...userMusic]
      userMusicCopy.forEach(post => {
        if (post.id === comment.musicPost) {
          post.comments = post.comments.filter(cmnt => cmnt._id !== comment._id)
        }
      })
      setUserMusic(userMusicCopy)
      console.log(userMusicCopy)
    }
  }

  return <>
    {(isLoading || userMusic.length === 0 || uid !== userMusic[0].creatorId) ?
      <div className="center"><Loading /></div> :
      <MusicList
        music={userMusic}
        respins={respinPosts}
        onDeleteItem={handleDeleteMusic}
        onRespin={handleRespin}
        onComment={handleComment}
      />}
  </>
}

export default UserMusic