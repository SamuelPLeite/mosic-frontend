import React, { useState } from 'react'

import { useForm } from '../../shared/hooks/form'
import Input from '../../shared/components/Form/Input'
import Button from '../../shared/components/Form/Button'
import Card from '../../shared/components/UIElements/Card'
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../shared/Utils/validator'
import './Auth.css'

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false)

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

  const handleSubmit = (event) => {
    event.preventDefault()

    console.log(formState.inputs)
  }

  return <Card className="authentication">
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
}

export default Auth