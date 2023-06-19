import React from "react"

import Card from "../../shared/components/UIElements/Card"
import MusicItem from "./MusicItem"
import './MusicList.css'

const MusicList = ({ music }) => {
  if (music.length === 0)
    return (
      <div className="music-list center">
        <Card>
          <h2>No music here!</h2>
        </Card>
      </div>
    )

  return <ul className="music-list">
    {music.map(item => <MusicItem key={item.id} item={item} />)}
  </ul>


}

export default MusicList