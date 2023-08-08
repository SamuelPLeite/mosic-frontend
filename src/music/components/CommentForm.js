import React, { useContext, useRef } from "react"

import Input from "../../shared/components/Form/Input"
import Button from "../../shared/components/Form/Button"
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import Loading from "../../shared/components/UIElements/Loading"
import { VALIDATOR_REQUIRE } from '../../shared/Utils/validator'
import { UserContext } from "../../shared/context/user-context"
import MusicContext from "../../shared/context/music-context"
import { useForm } from "../../shared/hooks/form"
import { useAxios } from '../../shared/hooks/http'
import './CommentForm.css'

const CommentForm = ({ postId }) => {
  const auth = useContext(UserContext)
  const [state, dispatch] = useContext(MusicContext)
  const { isLoading, error, sendReq, resetError } = useAxios()
  const inputRef = useRef()

  const [formState, handleInput] = useForm(
    {
      comment: {
        value: '',
        isValid: false
      }
    },
    false
  )

  const handleSubmit = async (event) => {
    event.preventDefault()

    const commentObj = {
      content: formState.inputs.comment.value,
      musicPost: postId
    }

    const response = await sendReq(process.env.REACT_APP_BACKEND_URL + 'api/music/comment', 'post',
      commentObj, {
      Authorization: `bearer ${auth.token}`
    })

    const creatorId = {
      id: auth.userId,
      name: auth.username,
      image: auth.image
    }

    if (response) {
      const { creator, ...rest } = response.comment
      const newComment = { ...rest, creatorId }

      const userMusicCopy = [...state.musicPosts]
      const userLikesCopy = [...state.likedPosts]

      userMusicCopy.forEach(post => post.id === newComment.musicPost && post.comments.unshift(newComment))
      const postWithComment = userLikesCopy.find(post => post.id === newComment.musicPost)
      if (postWithComment)
        postWithComment.comments.unshift(newComment)

      dispatch({
        type: "CHANGE_MUSICPOSTS",
        payload: userMusicCopy
      })
      dispatch({
        type: "CHANGE_LIKEDPOSTS",
        payload: userLikesCopy
      })


      if (inputRef.current) {
        inputRef.current.resetInput();
      }
    }
    event.target.reset()
  }

  return (<>
    <ErrorModal error={error} onClear={resetError} />
    {isLoading && <Loading asOverlay />}
    {auth.isLoggedIn ?
      <li className="comment-form">
        <div className="comment-form__user">
          <img
            src={process.env.REACT_APP_BACKEND_URL + auth.image}
            alt={auth.username}
          />
        </div>
        <form className="comment-form__form" onSubmit={handleSubmit}>
          <Input
            ref={inputRef}
            id="comment"
            type="text"
            label={auth.username}
            onInput={handleInput}
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Enter valid comment!"
          />
          <Button type="submit" disabled={!formState.isValid}>Comment</Button>
        </form>
      </li> : <div className="fallback center"><span>Please, <a href="/login">log in</a> to make a comment.</span></div>
    }
  </>
  )
}

export default CommentForm