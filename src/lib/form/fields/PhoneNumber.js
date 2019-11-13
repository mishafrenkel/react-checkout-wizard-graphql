/** @format */

import React from 'react'
import PhoneInput from 'react-phone-number-input'

import TextField from '@material-ui/core/TextField'

import 'react-phone-number-input/style.css'

const PhoneNumberCustom = ({ inputRef, ...other }) => {
  return (
    <PhoneInput
      /*
      ref={ref => {
        inputRef(ref ? ref.inputElement : null)
      }}
      */
      {...other}
    />
  )
}

const PhoneNumber = ({ input, meta: { touched, invalid, error }, ...rest }) => (
  <TextField
    {...input}
    error={touched && invalid}
    helperText={touched && error}
    InputProps={{
      inputComponent: PhoneNumberCustom
    }}
    margin="normal"
    fullWidth
    {...rest}
  />
)

export default PhoneNumber
