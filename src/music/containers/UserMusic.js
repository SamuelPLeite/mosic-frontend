import React from "react"
import { useParams } from "react-router-dom"

import MusicList from "../components/MusicList"
import './UserMusic.css'

const MUSIC = [
  {
    id: "mid1",
    title: "Notget",
    artist: "Björk",
    image: "https://upload.wikimedia.org/wikipedia/pt/f/f1/Bj%C3%B6rk_-_Vulnicura_%28Official_Album_Cover%29.png",
    description: "What a song! :D",
    isSong: true,
    creatorId: "uid1"
  },
  {
    id: "mid2",
    title: "Lionsong",
    artist: "Björk",
    image: "https://upload.wikimedia.org/wikipedia/pt/f/f1/Bj%C3%B6rk_-_Vulnicura_%28Official_Album_Cover%29.png",
    description: "What a song! :D",
    isSong: true,
    creatorId: "uid2"
  }
]

const UserMusic = () => {
  const uid = useParams().uid
  const filterMusic = MUSIC.filter(item => item.creatorId === uid)

  return <MusicList music={filterMusic} />
}

export default UserMusic