import React from 'react';

import UserItem from './UserItem';
import './UsersList.css'

const UsersList = ({ users }) => {
  if (users.length === 0)
    return (
      <div className="center">
        <h2>No users here!</h2>
      </div>
    )


  return <>
    <div className="page-title">
      <span className="page-title__text">
        <span className="page-title__highlight">
          Discover{" "}
        </span>
        <span>
          what people are{" "}
          <span className="page-title__highlight">
            spinning
          </span>
        </span>
      </span>
    </div>
    <ul className="users-list">
      {users.map(user => <UserItem key={user.id} user={user} />)}
    </ul>
  </>
}

export default UsersList