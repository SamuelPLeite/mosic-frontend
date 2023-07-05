import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import Input from '../../shared/components/Form/Input'
import Button from '../../shared/components/Form/Button'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import Loading from '../../shared/components/UIElements/Loading'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/Utils/validator'
import { useForm } from '../../shared/hooks/form'
import { useAxios } from '../../shared/hooks/http'
import { UserContext } from '../../shared/context/user-context'
import './MusicForm.css'

const PostMusic = () => {
  const auth = useContext(UserContext)
  const { isLoading, error, sendReq, resetError } = useAxios()
  const [formState, handleInput] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      artist: {
        value: '',
        isValid: false
      },
      rating: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
    },
    false
  )

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const response = await sendReq('http://localhost:3001/api/music/', 'post', {
      title: formState.inputs.title.value,
      artist: formState.inputs.artist.value,
      rating: formState.inputs.rating.value,
      description: formState.inputs.description.value,
      creatorId: auth.userId,
      isSong: true
    })

    if (response)
      navigate('/')
  }

  return <>
    <ErrorModal error={error} onClear={resetError} />
    <form className="music-form" onSubmit={handleSubmit}>
      {isLoading && <Loading asOverlay />}
      <Input
        id="title"
        type="text"
        label="Title"
        element="input"
        onInput={handleInput}
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Enter valid title!"
      />
      <Input
        id="artist"
        type="text"
        label="Artist"
        element="input"
        onInput={handleInput}
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Enter valid artist!"
      />
      <Input
        id="rating"
        type="text"
        label="Rating"
        element="input"
        onInput={handleInput}
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Enter valid rating!"
      />
      <Input
        id="description"
        type="text"
        label="Description"
        onInput={handleInput}
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Enter valid description (5 characters minimum)!"
      />
      <Button type="submit" disabled={!formState.isValid}>Post music!</Button>
    </form>
  </>
}

export default PostMusic