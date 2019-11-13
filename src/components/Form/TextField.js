import React from 'react'
import TextField from '@material-ui/core/TextField'

export default ({ input, label, meta, inputRef, autoComplete, ...props }) => {
  const error = meta.error && meta.touched && meta.invalid ? meta.error : undefined

  return (
    <TextField
      {...input}
      {...props}
      error={Boolean(error)}
      id={input.name}
      variant="outlined"
      placeholder={label}
      label={error || label}
      inputRef={inputRef}
      fullWidth
      autoComplete={autoComplete}
    />
  )
}