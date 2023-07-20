import { createContext } from 'react';

export const UserContext = createContext({
  token: null,
  userId: null,
  isLoggedIn: false,
  respinPosts: [],
  login: () => { },
  logout: () => { }
})