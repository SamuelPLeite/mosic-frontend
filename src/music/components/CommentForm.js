import React, { useContext } from "react"

import Input from "../../shared/components/Form/Input"
import Button from "../../shared/components/Form/Button"
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import Loading from "../../shared/components/UIElements/Loading"
import { VALIDATOR_REQUIRE } from '../../shared/Utils/validator'
import { UserContext } from "../../shared/context/user-context"
import { useForm } from "../../shared/hooks/form"
import { useAxios } from '../../shared/hooks/http'
import './CommentForm.css'

const CommentForm = ({ postId, onComment }) => {
  const auth = useContext(UserContext)
  const { isLoading, error, sendReq, resetError } = useAxios()

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
      handleInput('comment', "dadada", false)
      console.log(formState.inputs.comment.value)
      onComment({ ...rest, creatorId, _id: id }, false)
    }
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