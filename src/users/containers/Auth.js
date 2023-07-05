import React, { useState, useContext } from 'react'

import { useForm } from '../../shared/hooks/form'
import { useAxios } from '../../shared/hooks/http'
import { UserContext } from '../../shared/context/user-context'
import Input from '../../shared/components/Form/Input'
import Button from '../../shared/components/Form/Button'
import Card from '../../shared/components/UIElements/Card'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import Loading from '../../shared/components/UIElements/Loading'
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../shared/Utils/validator'
import './Auth.css'

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false)

  const { isLoading, error, sendReq, resetError } = useAxios()

  const auth = useContext(UserContext)

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
        username: undefined

      }, validRes)
    } else {
      setFormData({
        ...formState.inputs,
        username: {
          value: '',
          isValid: false
        }
      }, false)
    }

    setIsSignup(prev => !prev)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const userSubmit = {
      name: isSignup && formState.inputs.username.value,
      email: formState.inputs.email.value,
      password: formState.inputs.password.value
    }

    let response
    if (isSignup) {
      response = await sendReq('http://localhost:3001/api/users/signup', 'post', userSubmit)
    } else {
      const { name, ...loginInfo } = userSubmit
      response = await sendReq('http://localhost:3001/api/users/login', 'post', loginInfo)
    }
    if (response)
      auth.login(response.user.id)

  }

  return <>
    <ErrorModal error={error} onClear={resetError} />
    <Card className="authentication">
      {isLoading && <Loading asOverlay />}
      <h2>Log In</h2>
      <hr />
      <form onSubmit={handleSubmit}>
        {isSignup &&
          <Input
            id="username"
            type="text"
            label="Username"
            element="input"
            onInput={handleInput}
            validators={[VALIDATOR_MINLENGTH(3)]}
            errorText="Enter valid username!"
          />}
        <Input
          id="email"
          type="text"
          label="Email"
          element="input"
          onInput={handleInput}
          validators={[VALIDATOR_EMAIL()]}
          errorText="Enter valid email!"
        />
        <Input
          id="password"
          type="text"
          label="Password"
          element="input"
          onInput={handleInput}
          validators={[VALIDATOR_MINLENGTH(8)]}
          errorText="A password has to be at least 8 characters long."
        />
        <Button type="submit" disabled={!formState.isValid}>
          {!isSignup ? 'Log In' : 'Sign Up'}
        </Button>
      </form>
      <Button inverse onClick={handleSwitchAuth}>
        {isSignup ? 'Log In' : 'Sign Up'} instead
      </Button>
    </Card>
  </>
}

export default Auth