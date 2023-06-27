import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MainNavigation from './shared/components/Navigation/MainNavigation';
import Users from "./users/containers/Users"
import PostMusic from './music/containers/PostMusic';
import UserMusic from './music/containers/UserMusic';
import UpdateMusic from './music/containers/UpdateMusic';
import Auth from './users/containers/Auth';

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Routes>
          <Route path="/users/:uid/music" element={<UserMusic />} exact />
          <Route path="/" element={<Users />} />
          <Route path="/music/new" element={<PostMusic />} />
          <Route path="/music/:mId" element={<UpdateMusic />} />
          <Route path="/login" element={<Auth />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App;
