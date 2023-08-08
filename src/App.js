import React from 'react';
import { useLocation, Routes, Route, Navigate } from 'react-router-dom';

import MainNavigation from './shared/components/Navigation/MainNavigation';
import Footer from './shared/components/UIElements/Footer';
import Welcome from './information/containers/Welcome';
import Users from "./users/containers/Users"
import PostMusic from './music/containers/PostMusic';
import UserMusic from './music/containers/UserMusic';
import UpdateMusic from './music/containers/UpdateMusic';
import SearchMusic from './music/containers/SearchMusic';
import AboutDev from './information/containers/AboutDev';
import Auth from './users/containers/Auth';
import { MusicContextProvider } from './shared/context/music-context';
import { UserContext } from './shared/context/user-context';
import { useAuth } from './shared/hooks/auth';

const App = () => {
  const { login, logout, token, userId, image, username } = useAuth()
  const location = useLocation();

  const shouldDisplayHeaderFooter = () => {
    const pathWithoutSlash = location.pathname.replace(/^\/|\/$/g, '')
    return (pathWithoutSlash !== '' && pathWithoutSlash !== 'about')
  }

  let routes

  if (token) {
    routes = <>
      <Route path="/users/:uid/music" element={<MusicContextProvider><UserMusic /></MusicContextProvider>} />
      <Route path="/music/new" element={<PostMusic />} />
      <Route path="/music/search" element={<MusicContextProvider><SearchMusic /></MusicContextProvider>} />
      <Route path="/music/:mId" element={<UpdateMusic />} />
      <Route path="/users" element={<Users />} />
      <Route path="/about" element={<AboutDev />} />
      <Route path="/" element={<Welcome />} />
      <Route path="*" element={<Navigate to="/users" />} />
    </>
  } else {
    routes = <>
      <Route path="/users/:uid/music" element={<MusicContextProvider><UserMusic /></MusicContextProvider>} />
      <Route path="/music/search" element={<MusicContextProvider><SearchMusic /></MusicContextProvider>} />
      <Route path="/login" element={<Auth />} />
      <Route path="/users" element={<Users />} />
      <Route path="/about" element={<AboutDev />} />
      <Route path="/" element={<Welcome />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </>
  }

  return (
    <UserContext.Provider value={
      {
        token,
        userId: userId,
        isLoggedIn: !!token,
        image,
        username,
        login: login,
        logout: logout
      }
    }>
      {shouldDisplayHeaderFooter() && <MainNavigation />}
      <main style={{ marginTop: shouldDisplayHeaderFooter() ? '6rem' : 0 }}>
        <Routes>
          {routes}
        </Routes>
      </main>
      {shouldDisplayHeaderFooter() && <Footer />}
    </UserContext.Provider>
  )
}

export default App;
