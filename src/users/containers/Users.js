import React, { useEffect, useState } from 'react';

import { useAxios } from '../../shared/hooks/http'
import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Loading from '../../shared/components/UIElements/Loading';

const Users = () => {
  const [users, setUsers] = useState()

  const { isLoading, error, sendReq, resetError } = useAxios()

  useEffect(() => {
    console.log('entered use effect!')
    const getUsers = async () => {
      const response = await sendReq('http://localhost:3001/api/users')
      setUsers(response.users)
    }
    getUsers()
  }, [sendReq])

  return <>
    <ErrorModal error={error} onClear={resetError} />
    {isLoading && <div className="center">
      <Loading />
    </div>}
    {!isLoading && users && <UsersList users={users} />}
  </>
}

export default Users