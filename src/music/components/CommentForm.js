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
      _id: auth.userId,
      name: auth.username,
      image: auth.image
    }

    if (response) {
      const { creator, id, ...rest } = response.comment
      const newComment = { _id: id, ...rest, creatorId }
      const userMusicCopy = [...state.musicPosts]
      userMusicCopy.forEach(post => post.id === newComment.musicPost && post.comments.unshift(newComment))
      userMusicCopy.forEach(post =>
        post.comments.length > 1 && post.comments[post.comments.length - 1]._id === post.comments[post.comments.length - 2]._id && post.comments.shift()) // temporary fix for duplicate comment issue
      console.log(userMusicCopy)
      dispatch({
        type: "CHANGE_MUSICPOSTS",
        payload: userMusicCopy
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
        <div className="comment-item__user">
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