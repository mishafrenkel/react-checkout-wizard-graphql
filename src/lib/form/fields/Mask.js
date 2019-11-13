/** @format */

import React from 'react'
import MaskedInput from 'react-text-mask'

import TextField from '@material-ui/core/TextField'

const TextMaskCustom = ({ inputRef, ...other }) => {
  return (
    <MaskedInput
      /*
      ref={ref => {
        inputRef(ref ? ref.inputElement : null)
      }}
      */
      //placeholderChar={'\u2000'}
      //mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      showMask
      {...other}
    />
  )
}

const MaskField = ({ input, meta: { touched, invalid, error }, ...rest }) => (
  <TextField
    margin="normal"
    fullWidth
    {...input}
    {...rest}
    error={touched && invalid}
    helperText={touched && error}
    InputProps={{
      inputComponent: TextMaskCustom
    }}
  />
)

export default MaskField
