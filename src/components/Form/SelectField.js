import React from 'react'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Select from '@material-ui/core/Select'

export default ({ input, label, meta, options, ...props }) => {
  const error = meta.error && meta.touched && meta.invalid ? meta.error : undefined

  return (
    <Select
      native
      id={input.name}
      label={label}
      variant="outlined"
      fullWidth
      labelWidth={0}
      input={
        <OutlinedInput
          name="age"
          id="outlined-age-native-simple"
          error={Boolean(error)}
        />
      }
      {...input}
      {...props}
    >
      {options.map(
        option => <option value={option.value} key={option.value}>{option.label}</option>
      )}
    </Select>
  )
}