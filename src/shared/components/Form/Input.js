import React, { useReducer, useEffect, useImperativeHandle, forwardRef } from 'react'

import { validate } from '../../Utils/validator'
import './Input.css'

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.var,
        isValid: validate(action.var, action.validators)
      }
    case 'TOUCH': {
      return {
        ...state,
        isTouched: true
      }
    }
    case 'RESET': {
      return {
        value: '',
        isValid: false,
        isTouched: false
      }
    }
    default:
      return state
  }
}

const Input = ({ id, label, element, type, placeholder, rows, errorText, validators, initValue, initValid, onInput, disabled }, ref) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initValue || '',
    isValid: initValid || false,
    isTouched: false
  })

  const { value, isValid } = inputState

  useEffect(() => {
    onInput && onInput(id, value, isValid)
  }, [id, value, isValid, onInput])

  const handleChange = event => {
    dispatch({ type: "CHANGE", var: event.target.value, validators: validators })
  }

  const handleTouch = () => {
    dispatch({
      type: 'TOUCH'
    })
  }

  // used to set data for test user
  const setInput = (value) => {
    dispatch({ type: "CHANGE", var: value, validators: validators })
  }

  const resetInput = () => {
    dispatch({
      type: 'RESET'
    })
  }

  useImperativeHandle(ref, () => ({
    resetInput,
    setInput
  }));

  const elementInput = element === 'input' ?
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      onChange={handleChange}
      onBlur={handleTouch}
      value={inputState.value}
      disabled={disabled}
    />
    : <textarea
      id={id}
      rows={rows || 3}
      onChange={handleChange}
      onBlur={handleTouch}
      value={inputState.value}
    />

  return <div className={`form-control ${(!inputState.isValid && inputState.isTouched) && 'form-control--invalid'}`}>
    <label htmlFor={id}>{label}</label>
    {elementInput}
    {(!inputState.isValid && inputState.isTouched) && <p>{errorText}</p>}
  </div>
}

export default forwardRef(Input)