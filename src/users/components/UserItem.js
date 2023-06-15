import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';
import './UserItem.css'

const UserItem = ({ user }) => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/users/${user.id}/music`}>
          <div className="user-item__image">
            <Avatar image={user.image} alt={user.name} />
          </div>
          <div className="user-item__info">
            <h2>{user.name}</h2>
            <h3>{user.musicCount} shared music.</h3>
          </div>
        </Link>
      </Card>
    </li>
  )
}

export default UserItem