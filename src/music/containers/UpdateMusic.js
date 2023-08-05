import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Rating from '@mui/material/Rating'

import Input from '../../shared/components/Form/Input'
import Button from '../../shared/components/Form/Button'
import Loading from '../../shared/components/UIElements/Loading'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import { VALIDATOR_MINLENGTH } from '../../shared/Utils/validator'
import { useForm } from '../../shared/hooks/form'
import { useAxios } from '../../shared/hooks/http'
import { UserContext } from '../../shared/context/user-context'
import './MusicForm.css'

const UpdateMusic = () => {
  const mId = useParams().mId
  const auth = useContext(UserContext)
  const [musicToUpdate, setMusicToUpdate] = useState()
  const { isLoading, error, sendReq, resetError } = useAxios()
  const navigate = useNavigate()

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

  useEffect(() => {
    const getMusic = async () => {
      const response = await sendReq(`${process.env.REACT_APP_BACKEND_URL}api/music/${mId}`)
      if (response) {
        setMusicToUpdate(response.music)
        setFormData({
          rating: {
            value: response.music.rating,
            isValid: true
          },
          description: {
            value: response.music.description,
            isValid: true
          }
        }, true)
      }
    }
    getMusic()
  }, [sendReq, mId, setFormData])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const response = await sendReq(`${process.env.REACT_APP_BACKEND_URL}api/music/${mId}`, 'patch', {
      rating: formState.inputs.rating.value,
      description: formState.inputs.description.value
    },
      { Authorization: `bearer ${auth.token}` })
    if (response)
      navigate(`/users/${auth.userId}/music`)
  }

  if (isLoading) {
    return <div className="center"><Loading /></div>
  } else if (!musicToUpdate && !error) {
    return <div className="center"><h1>Invalid music ID.</h1></div>
  }

  if (musicToUpdate.creatorId.id !== auth.id) {
    return (<div className="page-title">
      <span className="page-title__text">
        You can't edit this post!
      </span>
    </div>)
  }

  return <>
    <ErrorModal error={error} onClear={resetError} />
    <div className="page-title">
      <span className="page-title__text">
        <span className="page-title__highlight">
          Edit{" "}
        </span>
        <span>
          your post{" "}
        </span>
      </span>
    </div>
    <form className="music-form" onSubmit={handleSubmit}>
      <div className="update-track">
        <div className="update-track__image">
          <img src={musicToUpdate.image} alt={musicToUpdate.title} />
        </div>
        <div className="update-track__info">
          <Input
            id="title"
            type="text"
            label="Title"
            element="input"
            onInput={null}
            initValue={musicToUpdate.title}
            disabled={true}
          />
          <Input
            id="artist"
            type="text"
            label="Artist"
            element="input"
            onInput={null}
            initValue={musicToUpdate.artist}
            disabled={true}
          />
          <div className="rating-block">
            <p className="rating-label">Rating</p>
            <Rating name="half-rating" defaultValue={musicToUpdate.rating} precision={0.5}
              onChange={(event, newValue) => {
                handleInput('rating', newValue, true)
              }} />
          </div>
        </div>
      </div>
      <Input
        id="description"
        type="text"
        label="Description"
        onInput={handleInput}
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Enter valid description!"
        initValue={musicToUpdate.description}
        initValid={true}
      />
      <Button type="submit" disabled={!formState.isValid}>Update post</Button>
    </form>
  </>
}

export default UpdateMusic