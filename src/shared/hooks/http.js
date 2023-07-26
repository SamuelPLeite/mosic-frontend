import { useState, useCallback, useRef, useEffect } from 'react'
import axios from 'axios'

export const useAxios = () => {
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const activeHttpRequests = useRef([])

  const sendReq = useCallback(async (url, method = 'get', data = null, headers = {}, params = null) => {
    setIsLoading(true)
    const HttpAbortCtrl = new AbortController()
    activeHttpRequests.current.push(HttpAbortCtrl)
    try {
      const response = await axios({
        method,
        url,
        headers,
        data,
        params,
        signal: HttpAbortCtrl.signal
      })

      activeHttpRequests.current = activeHttpRequests.current.filter(
        reqCtrl => reqCtrl !== HttpAbortCtrl
      )

      setIsLoading(false)
      return response.data
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setIsLoading(false)
          console.log(error)
          return { error: 404 }
        }
        setError(error.response.data.message)
      } else
        if (error.code === 'ERR_CANCELED') {
          return
        } else {
          setError(error.message || 'Error detected, please do try again!')
        }
      setIsLoading(false)
      console.log(error)
    }
  }, [])

  const resetError = () => {
    setError(null)
  }

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort())
    }
  }, [])

  return { isLoading, error, sendReq, resetError }
}