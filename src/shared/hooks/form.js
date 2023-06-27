import { useCallback, useReducer } from 'react'

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formValid = true
      for (const input in state.inputs) {
        if (!state.inputs[input])
          continue
        if (input === action.input) {
          formValid = formValid && action.isValid
        } else {
          formValid = formValid && state.inputs[input].isValid
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.input]: {
            value: action.value,
            isValid: action.isValid
          }
        },
        isValid: formValid
      }
    case 'SET_DATA':
      return {
        inputs: action.inputs,
        isValid: action.isValid
      }
    default:
      return state
  }
}

export const useForm = (initInputs, initFormVal) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initInputs,
    isValid: initFormVal
  })

  const handleInput = useCallback((id, value, isValid) => {
    dispatch({ type: 'INPUT_CHANGE', value: value, isValid: isValid, input: id })
  }, [])

  const setFormData = useCallback((inputData, formVal) => {
    dispatch({
      type: 'SET_DATA',
      inputs: inputData,
      isValid: formVal
    })
  }, [])

  return [formState, handleInput, setFormData]

}