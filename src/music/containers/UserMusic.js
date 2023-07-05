import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import MusicList from "../components/MusicList"
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import Loading from "../../shared/components/UIElements/Loading"
import { useAxios } from "../../shared/hooks/http"
import './UserMusic.css'

const MUSIC = [
  {
    id: "mid1",
    title: "Notget",
    artist: "Björk",
    image: "https://upload.wikimedia.org/wikipedia/pt/f/f1/Bj%C3%B6rk_-_Vulnicura_%28Official_Album_Cover%29.png",
    description: "What a song! :D",
    rating: "5/5",
    isSong: true,
    creatorId: "uid1"
  },
  {
    id: "mid2",
    title: "Lionsong",
    artist: "Björk",
    image: "https://upload.wikimedia.org/wikipedia/pt/f/f1/Bj%C3%B6rk_-_Vulnicura_%28Official_Album_Cover%29.png",
    description: "What a song! :D",
    rating: "5/5",
    isSong: true,
    creatorId: "uid2"
  }
]

const UserMusic = () => {
  const [userMusic, setUserMusic] = useState()
  const { isLoading, error, sendReq, resetError } = useAxios()

  const uid = useParams().uid

  useEffect(() => {
    const getUserMusic = async () => {
      const response = await sendReq(`http://localhost:3001/api/music/user/${uid}`)
      if (response)
        setUserMusic(response.userMusic)
    }
    getUserMusic()
  }, [sendReq, uid])

  return <>
    <ErrorModal error={error} onClear={resetError} />
    {isLoading && <div className="center"><Loading /></div>}
    {!isLoading && userMusic && <MusicList music={userMusic} />}
  </>
}

export default UserMusic