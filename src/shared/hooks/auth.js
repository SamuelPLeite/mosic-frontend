import { useState, useCallback, useEffect } from 'react'

let logoutTimer

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [tokenTimeout, setTokenTimeout] = useState()
  const [userId, setUserId] = useState(null)
  const [username, setUsername] = useState(null)
  const [image, setImage] = useState(null)

  const login = useCallback((uid, token, image, username, expiration) => {
    setToken(token)
    setUserId(uid)
    setImage(image)
    setUsername(username)
    const tokenExpirationDate = expiration || new Date(new Date().getTime() + 1000 * 60 * 60)
    setTokenTimeout(tokenExpirationDate)
    localStorage.setItem('userData', JSON.stringify({
      userId: uid,
      token,
      image,
      username,
      expiration: tokenExpirationDate.toISOString()
    }))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setTokenTimeout(null)
    setUserId(null)
    setImage(null)
    setUsername(null)
    localStorage.removeItem('userData')
  }, [])

  useEffect(() => {
    if (token && tokenTimeout) {
      const timeout = tokenTimeout.getTime() - new Date().getTime()
      logoutTimer = setTimeout(logout, timeout)
    } else {
      clearTimeout(logoutTimer)
    }
  }, [token, logout, tokenTimeout])

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'))
    if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
      login(storedData.userId, storedData.token, storedData.image, storedData.username, new Date(storedData.expiration))
    }
  }, [login])

  return { login, logout, token, userId, image, username }
}