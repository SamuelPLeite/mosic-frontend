import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import MusicList from "../components/MusicList"
import Loading from "../../shared/components/UIElements/Loading"
import { useAxios } from "../../shared/hooks/http"
import './UserMusic.css'

const UserMusic = () => {
  const [userMusic, setUserMusic] = useState([])
  const { isLoading, sendReq } = useAxios()

  const uid = useParams().uid

  useEffect(() => {
    const getUserMusic = async () => {
      const response = await sendReq(`http://localhost:3001/api/music/user/${uid}`)
      if (response)
        setUserMusic(response.userMusic)
    }
    getUserMusic()
  }, [sendReq, uid])

  const handleDeleteMusic = (mId) => {
    setUserMusic((currentMusic) => currentMusic.filter(m => m.id !== mId))
  }

  return <>
    {isLoading && <div className="center"><Loading /></div>}
    {!isLoading && userMusic &&
      <MusicList music={userMusic} onDeleteItem={handleDeleteMusic} />}
  </>
}

export default UserMusic