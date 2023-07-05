import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import MainNavigation from './shared/components/Navigation/MainNavigation';
import Users from "./users/containers/Users"
import PostMusic from './music/containers/PostMusic';
import UserMusic from './music/containers/UserMusic';
import UpdateMusic from './music/containers/UpdateMusic';
import Auth from './users/containers/Auth';
import { UserContext } from './shared/context/user-context';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState(null)

  const login = useCallback((uid) => {
    setIsLoggedIn(true)
    setUserId(uid)
  }, [])

  const logout = useCallback(() => {
    setIsLoggedIn(false)
    setUserId(null)
  }, [])

  let routes

  if (isLoggedIn) {
    routes = <>
      <Route path="/users/:uid/music" element={<UserMusic />} />
      <Route path="/music/new" element={<PostMusic />} />
      <Route path="/music/:mId" element={<UpdateMusic />} />
      <Route path="/" element={<Users />} />
      <Route path="*" element={<Navigate to="/" />} />
    </>
  } else {
    routes = <>
      <Route path="/users/:uid/music" element={<UserMusic />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/" element={<Users />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </>
  }

  return (
    <UserContext.Provider value={{ userId: userId, isLoggedIn: isLoggedIn, login: login, logout: logout }}>
      <Router>
        <MainNavigation />
        <main>
          <Routes>
            {routes}
          </Routes>
        </main>
      </Router>
    </UserContext.Provider>
  )
}

export default App;
