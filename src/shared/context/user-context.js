import { createContext } from 'react';

export const UserContext = createContext({
  token: null,
  userId: null,
  username: null,
  isLoggedIn: false,
  image: null,
  login: () => { },
  logout: () => { }
})