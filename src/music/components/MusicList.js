import React from "react"

import Card from "../../shared/components/UIElements/Card"
import MusicItem from "./MusicItem"
import './MusicList.css'

const MusicList = ({ music, respins, onDeleteItem, onRespin, onComment }) => {
  if (music.length === 0)
    return (
      <div className="music-list center">
        <Card>
          <h2>No music here!</h2>
        </Card>
      </div>
    )

  return <ul className="music-list">
    {music.map(item =>
      <MusicItem
        key={item.respinId ? item.respinId : item.id}
        item={item}
        respins={respins}
        onDelete={onDeleteItem}
        onRespin={onRespin}
        onComment={onComment}
      />)}
  </ul>


}

export default MusicList