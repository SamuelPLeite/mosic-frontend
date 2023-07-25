import { createContext, useReducer, useContext } from 'react'

const musicReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_MUSICPOSTS":
      return {
        ...state,
        musicPosts: action.payload
      }
    case "CHANGE_USERRESPINS":
      return {
        ...state,
        userRespins: action.payload
      }
    case "CHANGE_UID":
      return {
        ...state,
        uid: action.payload
      }
    default:
      return state
  }
}

const initialState = {
  musicPosts: [],
  userRespins: [],
  uid: ''
}

const MusicContext = createContext()

export const MusicContextProvider = (props) => {
  const [music, musicDispatch] = useReducer(musicReducer, initialState)

  return (
    <MusicContext.Provider value={[music, musicDispatch]}>
      {props.children}
    </MusicContext.Provider>
  )
}

export const useMusicValue = () => {
  const musicAndDispatch = useContext(MusicContext)
  return musicAndDispatch[0]
}

export const useMusicDispatch = () => {
  const musicAndDispatch = useContext(MusicContext)
  return musicAndDispatch[1]
}


export default MusicContext