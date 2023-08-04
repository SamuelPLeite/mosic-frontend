import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';
import {
  RespinIcon, LikeIcon, CommentIcon,
} from "../../music/components/Icons"
import { Rating } from '@mui/material';
import './UserItem.css'

const UserItem = ({ user }) => {
  const lastPost = user.lastMusicPost[0]

  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/users/${user.id}/music`}>
          <div className="user-item__header">
            <div className="user-item__image">
              <Avatar image={process.env.REACT_APP_BACKEND_URL + user.image} alt={user.name} />
            </div>
            <div className="user-item__info">
              <h2>{user.name}</h2>
            </div>
          </div>
          <div className="user-item__infobar">
            <div className="user-item__infobar-item">
              <div className="user-item__infobar-item_icon">
                <RespinIcon />
                <span>{user.musicPostsCount}</span>
              </div>
              <span className="legend">posts</span>
            </div>
            <div className="user-item__infobar-item">
              <div className="user-item__infobar-item_icon">
                <LikeIcon />
                <span>{user.likesCount}</span>
              </div>
              <span className="legend">likes</span>
            </div>
            <div className="user-item__infobar-item">
              <div className="user-item__infobar-item_icon">
                <CommentIcon />
                <span>{user.commentsCount}</span>
              </div>
              <span className="legend">comments</span>
            </div>
          </div>
          <span className="lastpost">Last post:</span>
          <div className="user-item__lastpost">
            {lastPost ? <>
              <div className="user-item__lastpost-container">
                <img src={lastPost.image} alt={lastPost.title} />
                <div className="user-item__lastpost-info">
                  <div className="title">{lastPost.title}</div>
                  <div>{lastPost.artist}</div>
                  <Rating name="half-rating" defaultValue={lastPost.rating} precision={0.5} readOnly />
                </div>
              </div>
              <div className="user-item__lastpost-bar">
                <div className="user-item__lastpost-bar__item">
                  <LikeIcon />
                  <span>{lastPost.likes.length}</span>
                </div>
                <div className="user-item__lastpost-bar__item">
                  <CommentIcon />
                  <span>{lastPost.comments.length}</span>
                </div>
              </div>
            </> : <div className="lastpost-fallback">
              {`${user.name} hasn't posted yet!`}
            </div>}
          </div>
        </Link>
      </Card>
    </li>
  )
}

export default UserItem