import React from 'react'

import Input from '../../shared/components/Form/Input'
import Button from '../../shared/components/Form/Button'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/Utils/validator'
import { useForm } from '../../shared/hooks/form'
import './MusicForm.css'

const PostMusic = () => {
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

  const handleSubmit = (event) => {
    event.preventDefault()

    console.log(formState.inputs)
  }

  return <form className="music-form" onSubmit={handleSubmit}>
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
}

export default PostMusic