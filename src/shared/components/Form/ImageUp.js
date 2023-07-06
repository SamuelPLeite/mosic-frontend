import React, { useEffect, useRef, useState } from 'react'

import Button from './Button'
import './ImageUp.css'

const ImageUp = ({ id, center, onInput, errorText }) => {
  const [imageFile, setImageFile] = useState()
  const [previewUrl, setPreviewUrl] = useState()
  const [isValid, setIsValid] = useState()

  const fileUploadRef = useRef()

  useEffect(() => {
    if (imageFile) {
      const fileReader = new FileReader()
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result)
      }
      fileReader.readAsDataURL(imageFile)
    }
  }, [imageFile])

  const handleChosen = (event) => {
    let file
    const fileIsValid = event.target.files && event.target.files.length === 1
    if (fileIsValid) {
      file = event.target.files[0]
      setImageFile(file)
    }
    setIsValid(fileIsValid)
    onInput(id, file, fileIsValid)
  }

  const handleChooseImage = () => {
    fileUploadRef.current.click()
  }

  return (
    <div className='form-control'>
      <input ref={fileUploadRef}
        id={id}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={handleChosen}
      />
      <div className={`image-upload ${center && 'center'}`}>
        <div className="image-upload__preview">
          {previewUrl ? <img src={previewUrl} alt="Preview" /> :
            <p>Pick an image!</p>}
        </div>
        <Button type="button" onClick={handleChooseImage}>Upload image</Button>
      </div>
      {!isValid && <p>{errorText}</p>}
    </div>
  )
}

export default ImageUp
