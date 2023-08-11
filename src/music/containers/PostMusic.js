import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Rating from '@mui/material/Rating'

import Input from '../../shared/components/Form/Input'
import Button from '../../shared/components/Form/Button'
import Modal from '../../shared/components/UIElements/Modal'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import Loading from '../../shared/components/UIElements/Loading'
import TrackButton from '../components/TrackButton'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/Utils/validator'
import { useForm } from '../../shared/hooks/form'
import { useAxios } from '../../shared/hooks/http'
import { useDebounce } from '../../shared/hooks/debounce'
import { UserContext } from '../../shared/context/user-context'
import './UpdateMusic.css'

const PostMusic = () => {
  const auth = useContext(UserContext)
  const { isLoading, error, sendReq, resetError } = useAxios()

  const [imageUrl, setImageUrl] = useState('')
  const [loadingImg, setLoadingImg] = useState(false)
  const [info, setInfo] = useState(null)
  const [isSong, setIsSong] = useState(true)
  const [showConfirmPost, setShowConfirmPost] = useState(false)


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

  const debouncedRequest = useDebounce(async () => {
    setLoadingImg(true)
    const responseFull = await axios.post(process.env.REACT_APP_BACKEND_URL + 'api/deezer', {
      title: formState.inputs.title.value,
      artist: formState.inputs.artist.value,
      isSong: isSong
    })

    const response = responseFull.data
    if (Object.keys(response).length !== 0) {
      if (isSong)
        setImageUrl(response.data.album.cover_big)
      else
        setImageUrl(response.data.cover_big)
      setInfo(response.data)
    }
    else {
      setImageUrl('')
      setInfo(null)
    }

    setLoadingImg(false)
  })

  useEffect(() => {
    debouncedRequest()
  }, [debouncedRequest, formState.inputs.title.value, formState.inputs.artist.value, isSong])

  const navigate = useNavigate()

  const handleTrackButton = (value) => {
    setIsSong(value)
  }

  const handleShowConfirm = () => {
    setShowConfirmPost(true)
  }

  const handleHideConfirm = () => {
    setShowConfirmPost(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const infoNOAPI = isSong ? {
      title: formState.inputs.title.value,
      duration: "0",
      preview: "",
      artist: {
        name: formState.inputs.artist.value,
        picture_medium: ""
      },
      album: {
        title: formState.inputs.title.value,
        cover_medium: ""
      }
    } : {
      title: formState.inputs.title.value,
      type: "album",
      record_type: "album",
      cover_medium: "",
      nb_track: "n/a",
      artist: {
        name: formState.inputs.artist.value,
        picture_medium: "",
        picture_small: ""
      }
    }

    const response = await sendReq(process.env.REACT_APP_BACKEND_URL + 'api/music/', 'post', {
      title: formState.inputs.title.value,
      artist: formState.inputs.artist.value,
      rating: formState.inputs.rating.value,
      image: imageUrl,
      info: info || infoNOAPI,
      description: formState.inputs.description.value,
      isSong: isSong
    }, {
      Authorization: `bearer ${auth.token}`
    })

    if (response)
      navigate(`/users/${auth.userId}/music`)
  }

  return <>
    <ErrorModal error={error} onClear={resetError} />
    <div className="page-title">
      <span className="page-title__text">
        <span className="page-title__highlight">
          Post music!
        </span>
      </span>
    </div>
    <form className="music-form" onSubmit={handleSubmit}>
      {isLoading && <Loading asOverlay />}
      <div className="music-form__details">
        <div className="music-form__details-image">
          {loadingImg && <div className='loading'><Loading /></div>}
          {imageUrl ? <img src={imageUrl} alt={'Rina'} /> :
            (!loadingImg && <div className="center">Waiting for valid Title and Artist to load artwork...</div>)}
        </div>
        <div className="music-form__details-fields">
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
          <div className="third-line">
            <div className="rating-block">
              <p className="rating-label">Rating</p>
              <Rating name="half-rating" defaultValue={0} precision={0.5}
                onChange={(event, newValue) => {
                  handleInput('rating', newValue, true)
                }} />
            </div>
            <div className="track-button"><TrackButton onChange={handleTrackButton} /></div>
          </div>
        </div>
      </div>
      <Input
        id="description"
        type="text"
        label="Description"
        onInput={handleInput}
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Enter valid description (5 characters minimum)!"
      />
      <Modal
        show={showConfirmPost}
        header="Confirm posting?"
        footer={<>
          <Button type="submit">Post it</Button>
          <Button inverse type="button" onClick={handleHideConfirm}>Cancel</Button>
        </>}
      >
        <span>The album or song you're trying to post couldn't be found in our database. Do you still want to post it? Some features might not work.</span>
      </Modal>
      <Button
        type={info ? "submit" : "button"}
        onClick={info ? null : handleShowConfirm}
        disabled={!formState.isValid}>
        Post music!
      </Button>
    </form>
  </>
}

export default PostMusic