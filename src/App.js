import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MainNavigation from './shared/components/Navigation/MainNavigation';
import Users from "./users/containers/Users"
import PostMusic from './music/containers/PostMusic';
import UserMusic from './music/containers/UserMusic';

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Routes>
          <Route path="/users/:uid/music" exact element={<UserMusic />} />
          <Route path="/" element={<Users />} />
          <Route path="/music/new" element={<PostMusic />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App;
