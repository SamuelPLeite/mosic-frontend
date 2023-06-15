import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
  const userArray = [{
    id: 'uid1',
    name: 'Sam',
    image: 'https://upload.wikimedia.org/wikipedia/pt/7/7d/Bjork_-_Homogenic_album.jpg',
    musicCount: 7
  }]

  return <UsersList users={userArray} />
}

export default Users