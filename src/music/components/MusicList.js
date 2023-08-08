import React, { forwardRef } from "react"

import { RespinSymbol } from "./Icons"
import MusicItem from "./MusicItem"
import './MusicList.css'

const MusicList = forwardRef(({ music }, ref) => {
  if (music.length === 0)
    return (
      <div ref={ref} className="music-list center">
        <h2 className="music-list__empty">
          <RespinSymbol />
          No posts... yet!
        </h2>
      </div>
    )

  return <ul ref={ref} className="music-list">
    {music.map(item =>
      <MusicItem
        key={item.respinId ? item.respinId : item.id}
        item={item}
      />)}
  </ul>
})


export default MusicList