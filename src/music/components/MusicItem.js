import React, { useState } from "react"
import { Link } from 'react-router-dom';

import Card from "../../shared/components/UIElements/Card"
import Modal from "../../shared/components/UIElements/Modal"
import './MusicItem.css'
import Button from "../../shared/components/Form/Button";

// title, artist, image, isSong, description, id, creatorId

const MusicItem = ({ item }) => {
  const [showDelete, setShowDelete] = useState(false)

  const handleShowDelete = () => {
    setShowDelete(true)
  }

  const handleHideDelete = () => {
    setShowDelete(false)
  }

  const handleDeleteMusic = () => {
    setShowDelete(false)
    console.log("D-ELITE!")
  }

  return <>
    <Modal
      show={showDelete}
      onCancel={handleHideDelete}
      header="Permanently delete post"
      footerClass="music-item__modal-actions"
      footer={<><Button inverse onClick={handleHideDelete}>CANCEL</Button>
        <Button danger onClick={handleDeleteMusic}>DELETE</Button></>}>
      <p>Confirm deleting post?</p>
    </Modal>
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
        <ul className="music-item__actions">
          <li className="left"><Link>RESPIN IT</Link></li>
          <li><Link>LIKE</Link></li>
          <li><Link to={`/music/${item.id}`}>EDIT</Link></li>
          <li className="right"><Link onClick={handleShowDelete}>DELETE</Link></li>
        </ul>
      </Card>
    </li>
  </>
}

export default MusicItem