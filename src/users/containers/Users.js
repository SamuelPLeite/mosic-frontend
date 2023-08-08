import React, { useEffect, useState } from 'react';

import { useAxios } from '../../shared/hooks/http'
import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Loading from '../../shared/components/UIElements/Loading';

const Users = () => {
  const [users, setUsers] = useState()

  const { isLoading, error, sendReq, resetError } = useAxios()

  useEffect(() => {
    const getUsers = async () => {
      const response = await sendReq(process.env.REACT_APP_BACKEND_URL + 'api/users')
      response && setUsers(response.users)
    }
    getUsers()
  }, [sendReq])

  return <>
    <ErrorModal error={error} onClear={resetError} />
    {isLoading && <Loading asOverlay />}
    {!isLoading && users && <UsersList users={users} />}
  </>
}

export default Users