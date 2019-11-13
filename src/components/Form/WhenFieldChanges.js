import React from 'react'
import { Field } from 'react-final-form'
import { OnChange } from 'react-final-form-listeners'

export default ({ field, becomes, set, to }) => (
  <Field name={set} subscription={{}}>
    {({ input: { onChange } }) => (
      <OnChange name={field}>
        {() => {
          if (becomes) { onChange(to) }
        }}
      </OnChange>
    )}
  </Field>
)