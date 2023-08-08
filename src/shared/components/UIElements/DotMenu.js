import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ErrorModal from './ErrorModal';
import { UserContext } from '../../context/user-context';

import './DotMenu.css'

export default function DotMenu({ labels, links, onDelete, uid }) {
  const auth = useContext(UserContext)
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)
  const [error, setError] = useState(null)

  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleDelete = () => {
    handleClose()
    if (auth.userId !== uid)
      setError("You are not allowed to delete this post!")
    else
      onDelete()
  }

  const resetError = () => {
    setError(null)
  }

  const handleEdit = () => {
    handleClose()
    if (auth.userId !== uid) {
      setError("You are not allowed to edit this post!")
    } else {
      navigate(links[0])
    }
  }

  return (<>
    <ErrorModal error={error} onClear={resetError} />
    <div className="more-menu">
      <IconButton
        aria-label="more"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {labels && labels.map((label, index) =>
          <MenuItem
            key={index}
            sx={{ fontFamily: 'inherit' }}
            onClick={handleEdit}  // currently only handling edit
          >
            {label}
          </MenuItem>
        )}
        {onDelete && <MenuItem
          key="delete-option"
          sx={{ fontFamily: 'inherit' }}
          onClick={handleDelete}>Delete post</MenuItem>}
      </Menu>
    </div>
  </>
  );
}