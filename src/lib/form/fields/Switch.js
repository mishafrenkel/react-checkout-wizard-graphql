/** @format */

import React from 'react'

import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Switch from '@material-ui/core/Switch'

export default ({ input: { value, ...input }, meta: { touched, invalid, error }, label, labelPlacement, helperText, ...rest }) => {
  return (
    <FormControl margin="normal" fullWidth error={touched && invalid} {...rest}>
      <FormControlLabel {...input} checked={Boolean(value)} control={<Switch />} label={label} labelPlacement={labelPlacement} />
      {helperText && <FormHelperText margin="dense">{helperText}</FormHelperText>}
      {touched && error && (
        <FormHelperText margin="dense" error>
          {error}
        </FormHelperText>
      )}
    </FormControl>
  )
}
