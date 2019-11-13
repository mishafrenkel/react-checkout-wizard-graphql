import React from 'react'
import PropTypes from 'prop-types'
import { compose, withProps, branch, renderNothing } from 'recompose'
import Typography from 'components/Typography'

const FormErrorsHoc = compose(
  withProps(({ errors }) => ({ errors: Object.values(errors || {}) })),
  branch(({ errors }) => !errors.length, renderNothing)
)

export const FormErrors = ({ errors, style }) => (
  <div style={style}>
    {errors.map((error, key) =>
      <Typography
        key={key}
        text={error}
        size="normal"
        spacing="none"
        color="error"
        style={{ textAlign: 'center' }}
      />
    )}
  </div>
)

FormErrors.defaultProps = {
  errors: {},
}

export default FormErrorsHoc(FormErrors)