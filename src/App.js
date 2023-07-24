import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import MainNavigation from './shared/components/Navigation/MainNavigation';
import Users from "./users/containers/Users"
import PostMusic from './music/containers/PostMusic';
import UserMusic from './music/containers/UserMusic';
import UpdateMusic from './music/containers/UpdateMusic';
import Auth from './users/containers/Auth';
import { UserContext } from './shared/context/user-context';
import { useAuth } from './shared/hooks/auth';

const App = () => {
  const { login, logout, token, userId, image, username } = useAuth()

  let routes

  if (token) {
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
      <Router>
        <MainNavigation />
        <main>
          <Routes>
            {routes}
          </Routes>
        </main>
        <svg className="test-wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#1C274C" fill-opacity="0.5" d="M0,192L15,208C30,224,60,256,90,229.3C120,203,150,117,180,106.7C210,96,240,160,270,186.7C300,213,330,203,360,213.3C390,224,420,256,450,277.3C480,299,510,309,540,298.7C570,288,600,256,630,250.7C660,245,690,267,720,272C750,277,780,267,810,240C840,213,870,171,900,176C930,181,960,235,990,218.7C1020,203,1050,117,1080,112C1110,107,1140,181,1170,197.3C1200,213,1230,171,1260,149.3C1290,128,1320,128,1350,117.3C1380,107,1410,85,1425,74.7L1440,64L1440,320L1425,320C1410,320,1380,320,1350,320C1320,320,1290,320,1260,320C1230,320,1200,320,1170,320C1140,320,1110,320,1080,320C1050,320,1020,320,990,320C960,320,930,320,900,320C870,320,840,320,810,320C780,320,750,320,720,320C690,320,660,320,630,320C600,320,570,320,540,320C510,320,480,320,450,320C420,320,390,320,360,320C330,320,300,320,270,320C240,320,210,320,180,320C150,320,120,320,90,320C60,320,30,320,15,320L0,320Z"></path></svg>
      </Router>
    </UserContext.Provider>
  )
}

export default App;
