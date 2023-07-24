import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import Input from '../../shared/components/Form/Input'
import Button from '../../shared/components/Form/Button'
import Loading from '../../shared/components/UIElements/Loading'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/Utils/validator'
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

  return <>
    <ErrorModal error={error} onClear={resetError} />
    <form className="music-form" onSubmit={handleSubmit}>
      <Input
        id="rating"
        type="text"
        label="Rating"
        element="input"
        onInput={handleInput}
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Enter valid rating!"
        initValue={musicToUpdate.rating}
        initValid={true}
      />
      <Input
        id="description"
        type="text"
        label="Description"
        onInput={handleInput}
        validators={[VALIDATOR_MINLENGTH]}
        errorText="Enter valid description!"
        initValue={musicToUpdate.description}
        initValid={true}
      />
      <Button type="submit" disabled={!formState.isValid}>Update post</Button>
    </form>
  </>
}

export default UpdateMusic