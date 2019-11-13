/** @format */

import React from 'react'

import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Checkbox from '@material-ui/core/Checkbox'

export default ({ input: { value, ...input }, meta: { touched, invalid, error }, label, labelPlacement, helperText, ...rest }) => (
  <FormControl margin="normal" fullWidth error={touched && invalid} {...rest}>
    <FormControlLabel {...input} checked={Boolean(value)} control={<Checkbox />} label={label} labelPlacement={labelPlacement} />
    {helperText && <FormHelperText margin="dense">{helperText}</FormHelperText>}
    {touched && error && (
      <FormHelperText margin="dense" error>
        {error}
      </FormHelperText>
    )}
  </FormControl>
)
