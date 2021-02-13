import { useState } from 'react'

const useForm = defaults => {
  const [values, setValues] = useState(defaults)

  const updateValue = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }
  return { values, updateValue }
}

export default useForm
