import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

export default ({ input, label, meta, ...props }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox checked={false} {...input} />
      }
      label={label}
      {...props}
    />
  )
}