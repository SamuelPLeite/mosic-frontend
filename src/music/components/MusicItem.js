import React, { useState } from "react"

import Card from "../../shared/components/UIElements/Card"
import './MusicItem.css'

// title, artist, image, isSong, description, id, creatorId

const MusicItem = ({ item }) => {

  return <>
    <li className="music-item">
      <Card className="music-item__content">

        <div className="music-item__info">
          <div className="music-item__image">
            <img src={item.image} alt={item.title} />
          </div>
          <div className="music-item__track">
            <h2>{item.title}</h2>
            <h3>{item.artist}</h3>
          </div>
        </div>
        <div className="music-item__description">
          <p>{item.description}</p>
        </div>
        <div className="music-item__actions">
          <button>RESPIN IT</button>
          <button>LIKE</button>
          <button>EDIT</button>
          <button>DELETE</button>
        </div>
      </Card>
    </li>
  </>
}

export default MusicItem