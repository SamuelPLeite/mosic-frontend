import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import './DotMenu.css'

export default function DotMenu({ labels, links, onDelete }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = () => {
    handleClose()
    onDelete()
  }

  return (
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
            component={Link}
            to={links[index]}
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
  );
}