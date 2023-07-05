import { createContext } from 'react';

export const UserContext = createContext({
  userId: null,
  isLoggedIn: false,
  login: () => { },
  logout: () => { }
})