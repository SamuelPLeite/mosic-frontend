import React from "react"
import { Link } from "react-router-dom"
import Popover from '@mui/material/Popover'

import { InfoIcon, InfoIconFilled } from "./Icons"

import './InfoPopover.css'

const recordTypeSwitch = (r_type) => {
  switch (r_type) {
    case "ep":
      return "EP"
    case "single":
      return "Single"
    case "album":
      return "Album"
    default:
      return r_type
  }
}

const InfoPopover = ({ item }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    event.preventDefault()
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const info = item.info
  const baseUrl = `/music/search/?artist.name=${info.artist.name}&`
  const open = Boolean(anchorEl);
  const id = open ? 'info-popover' : undefined;

  return (<>
    <Link onClick={handleClick}>
      {open ? <InfoIconFilled /> : <InfoIcon />}
    </Link>
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <div className="info-popover">
        {item.isSong ? <>
          <Link to={baseUrl + `album.title=${info.album.title}&title=${info.title}`}>
            <span><b>Track's title:</b> {info.title}<br /></span>
          </Link>
          <span className="duration">
            <b>Track's duration:</b> {new Date(info.duration * 1000).toISOString().slice(14, 19)}<br />
          </span>
          <Link to={baseUrl + `album.title=${info.album.title}`}>
            <span><b>Album:</b> {info.album.title}<br /></span>
          </Link>
        </> : <>
          <Link to={baseUrl + `record_type=${info.record_type}&title=${info.title}`}>
            <span><b>Record title:</b> {info.title}<br /></span>
          </Link>
          <Link to={baseUrl + `record_type=${info.record_type}`}>
            <span><b>Record type:</b> {recordTypeSwitch(info.record_type)}<br /></span>
          </Link>
          <span className="duration">
            <b>Number of tracks:</b> {info.nb_tracks}<br />
          </span>
        </>
        }
        <Link to={baseUrl}>
          <span className="artist">
            <b>Artist:</b>
            {info.artist.picture_small && <img src={info.artist.picture_small} alt={info.artist.name} />} <span>{info.artist.name}</span><br />
          </span>
        </Link>

      </div>

    </Popover>
  </>)
}

export default InfoPopover