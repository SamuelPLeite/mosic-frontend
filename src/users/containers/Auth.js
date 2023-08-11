import React, { useState, useContext, useRef } from 'react'

import { useForm } from '../../shared/hooks/form'
import { useAxios } from '../../shared/hooks/http'
import { UserContext } from '../../shared/context/user-context'
import Input from '../../shared/components/Form/Input'
import Button from '../../shared/components/Form/Button'
import Card from '../../shared/components/UIElements/Card'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import Loading from '../../shared/components/UIElements/Loading'
import ImageUp from '../../shared/components/Form/ImageUp'
import { UserIcon, AtIcon, PasswordIcon } from '../../music/components/Icons'
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../shared/Utils/validator'
import './Auth.css'

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false)

  const { isLoading, error, sendReq, resetError } = useAxios()

  const auth = useContext(UserContext)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const [formState, handleInput, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      },
    },
    false
  )

  const handleSwitchAuth = () => {
    if (isSignup) {
      const validRes = formState.inputs.email.isValid && formState.inputs.password.isValid
      setFormData({
        ...formState.inputs,
        username: undefined,
        image: undefined

      }, validRes)
    } else {
      setFormData({
        ...formState.inputs,
        username: {
          value: '',
          isValid: false
        },
        image: {
          value: null,
          isValid: false
        }
      }, false)
    }

    setIsSignup(prev => !prev)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    let response
    if (isSignup) {
      const formData = new FormData()
      formData.append('name', formState.inputs.username.value)
      formData.append('email', formState.inputs.email.value)
      formData.append('password', formState.inputs.password.value)
      formData.append('image', formState.inputs.image.value)
      response = await sendReq(process.env.REACT_APP_BACKEND_URL + 'api/users/signup', 'post', formData)
    } else {
      response = await sendReq(process.env.REACT_APP_BACKEND_URL + 'api/users/login', 'post', {
        email: formState.inputs.email.value,
        password: formState.inputs.password.value
      })
    }
    if (response)
      auth.login(response.userId, response.token, response.image, response.username)
  }

  const handleTestUser = () => {
    emailRef.current.setInput("test@mosic.com")
    passwordRef.current.setInput("mosic123")
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  }

  return <>
    <ErrorModal error={error} onClear={resetError} />
    <Card className="authentication">
      {isLoading && <Loading asOverlay />}
      <h2>{isSignup ? "Sign Up to Mosic" : "Log In to Mosic"}</h2>
      <form onSubmit={handleSubmit}>
        {isSignup &&
          <div className="icon-field">
            <UserIcon />
            <Input
              id="username"
              type="text"
              label="Username"
              element="input"
              onInput={handleInput}
              validators={[VALIDATOR_MINLENGTH(3)]}
              errorText="Enter valid username!"
            />
          </div>}
        {isSignup && <ImageUp center id="image"
          onInput={handleInput} />}
        <div className="icon-field">
          <AtIcon />
          <Input
            ref={emailRef}
            id="email"
            type="text"
            label="Email"
            element="input"
            onInput={handleInput}
            validators={[VALIDATOR_EMAIL()]}
            errorText="Enter valid email!"
          />
        </div>
        <div className="icon-field">
          <PasswordIcon />
          <Input
            ref={passwordRef}
            id="password"
            type="password"
            label="Password"
            element="input"
            onInput={handleInput}
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="A password has to be at least 8 characters long."
          />
        </div>
        <Button type="submit" disabled={!formState.isValid}>
          {!isSignup ? 'Log In' : 'Sign Up'}
        </Button>
      </form>
      <Button inverse onClick={handleSwitchAuth}>
        {isSignup ? 'Log In' : 'Sign Up'} instead
      </Button>
    </Card>
    {!isSignup && <Card className="authentication">
      <h2>Test user</h2>
      <p>You can choose to Sign Up and quickly create your own user or simply use the dedicated test user.</p>
      <div className="icon-field">
        <AtIcon />
        test@mosic.com
      </div>
      <div className="icon-field">
        <PasswordIcon />
        mosic123
      </div>
      <Button onClick={handleTestUser}>
        Use Test user
      </Button>
    </Card>}
  </>
}

export default Auth