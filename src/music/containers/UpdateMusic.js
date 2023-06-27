import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Input from '../../shared/components/Form/Input'
import Button from '../../shared/components/Form/Button'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/Utils/validator'
import { useForm } from '../../shared/hooks/form'
import './MusicForm.css'

const MUSIC = [
  {
    id: "mid1",
    title: "Notget",
    artist: "Björk",
    image: "https://upload.wikimedia.org/wikipedia/pt/f/f1/Bj%C3%B6rk_-_Vulnicura_%28Official_Album_Cover%29.png",
    description: "What a song! :D",
    rating: "5/5",
    isSong: true,
    creatorId: "uid1"
  },
  {
    id: "mid2",
    title: "Lionsong",
    artist: "Björk",
    image: "https://upload.wikimedia.org/wikipedia/pt/f/f1/Bj%C3%B6rk_-_Vulnicura_%28Official_Album_Cover%29.png",
    description: "What a song! :D",
    rating: "5/5",
    isSong: true,
    creatorId: "uid2"
  }
]

const UpdateMusic = () => {
  const mId = useParams().mId

  const [formState, handleInput, setFormData] = useForm(
    {
      rating: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    },
    false
  )

  const musicToUpdate = MUSIC.find(music => music.id === mId)

  useEffect(() => {
    if (musicToUpdate) {
      setFormData({
        rating: {
          value: musicToUpdate.rating,
          isValid: true
        },
        description: {
          value: musicToUpdate.description,
          isValid: true
        }
      }, true)
    }
  }, [setFormData, musicToUpdate])


  if (!musicToUpdate) {
    return <div className="center"><h1>Invalid music ID.</h1></div>
  }

  if (!formState.inputs.description.value) {
    return <div className="center"><h2>Loading...</h2></div>
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    console.log(formState.inputs)
  }

  return <form className="music-form" onSubmit={handleSubmit}>
    <Input
      id="rating"
      type="text"
      label="Rating"
      element="input"
      onInput={handleInput}
      validators={[VALIDATOR_REQUIRE()]}
      errorText="Enter valid rating!"
      initValue={formState.inputs.rating.value}
      initValid={formState.inputs.rating.isValid}
    />
    <Input
      id="description"
      type="text"
      label="Description"
      onInput={handleInput}
      validators={[VALIDATOR_MINLENGTH]}
      errorText="Enter valid description!"
      initValue={formState.inputs.description.value}
      initValid={formState.inputs.description.isValid}
    />
    <Button type="submit" disabled={!formState.isValid}>Update post</Button>
  </form>
}

export default UpdateMusic