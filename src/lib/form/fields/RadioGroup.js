/** @format */

import React from 'react'

import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormHelperText from '@material-ui/core/FormHelperText'
import Radio from '@material-ui/core/Radio'

export default ({ input, meta: { touched, invalid, error }, label, LabelProps = {}, options = [], helperText, ...rest }) => (
  <FormControl component="fieldset" {...rest}>
    {label && (
      <FormLabel component="legend" {...LabelProps}>
        {label}
      </FormLabel>
    )}
    <RadioGroup {...input}>
      {Array.from(options).map(option => (
        <FormControlLabel key={option.value} control={<Radio />} {...option} />
      ))}
    </RadioGroup>
    {helperText && <FormHelperText margin="dense">{helperText}</FormHelperText>}
    {touched && invalid && error && (
      <FormHelperText margin="dense" error>
        {error}
      </FormHelperText>
    )}
  </FormControl>
)
