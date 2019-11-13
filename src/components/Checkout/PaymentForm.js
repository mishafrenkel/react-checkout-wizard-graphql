import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Form, Field } from 'react-final-form'
import * as yup from 'yup'
import cardValidator from 'card-validator'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from 'components/Form/TextField'
import WhenFieldChanges from 'components/Form/WhenFieldChanges'
import { errorMessages } from 'utils/validation'
import { CheckoutContext } from 'services/checkout'
import {
  formatNumber,
  formatYear,
  formatMonth,
  formatCVV,
  formatExpiry,
  guessType,
} from 'services/card'

const validationSchema = yup.object().shape({
  ccNumber: yup.string().test('ccNumber', 'Invalid card number', (value) => cardValidator.number(value).isValid).required(),
  ccExpiry: yup.string().test('ccExpiry', 'Invalid expiry date', (value) => cardValidator.expirationDate(value).isValid).required(),
  ccCvv: yup.string().test('ccCvv', 'Invalid CC Number', (value) => cardValidator.cvv(value).isValid).required(),
  ccName: yup.string().required(),
})

const errorSchema = [
  { path: 'ccNumber', message: 'Invalid card number' },
  { path: 'ccExpiry', message: 'Invalid expiry date' },
  { path: 'ccCvv', message: 'Invalid security code' },
  { path: 'ccName', message: 'Invalid name' },
]

const validate = async values => {
  try {
    await validationSchema.validate(values, { abortEarly: false })
  } catch ({ inner }) {
    return errorMessages(errorSchema, inner)
  }
}

const normalizeForm = (payload) => ({
  methodId: 'usaepay',
  paymentData: {
    ...payload,
    ccNumber: payload.ccNumber.replace(/\s+/g, ''),
    ccExpiry: {
      month: payload.ccExpiryMonth,
      year: payload.ccExpiryYear,
    },
  },
})

const PaymentForm = ({ classes, handleFormSubmit }) => (
  <CheckoutContext.Consumer>
    {checkoutService =>
      <div className={classes.container}>
        {checkoutService.submitOrderMeta.state === 'FAILURE' ?
          <Typography variant="body1" color="error" gutterBottom>{checkoutService.submitOrderMeta.message}</Typography>
        : null}

        <Form
          onSubmit={(form) => {
            const payload = normalizeForm(form)
            checkoutService.submitOrder(payload)
              .then(handleFormSubmit)
              .catch(() => {})
          }}
          validate={validate}
          render={({ handleSubmit, mutators, values }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={24}>

                <WhenFieldChanges
                  field="ccNumber"
                  becomes={values.ccNumber !== null}
                  set="ccType"
                  to={guessType(values.ccNumber)}
                />
                <WhenFieldChanges
                  field="ccExpiry"
                  becomes={values.ccExpiry !== null}
                  set="ccExpiryYear"
                  to={formatYear(values.ccExpiry)}
                />
                <WhenFieldChanges
                  field="ccExpiry"
                  becomes={values.ccExpiry !== null}
                  set="ccExpiryMonth"
                  to={formatMonth(values.ccExpiry)}
                />

                <div>
                  <Typography variant="h5">{guessType(values.ccNumber)}</Typography>
                </div>

                <Grid item xs={12}>
                  <Field name="ccNumber" component={TextField} label="Credit Card Number" format={formatNumber} />
                </Grid>
                <Grid item xs={6}>
                  <Field name="ccExpiry" component={TextField} label="Expiration Date" format={formatExpiry} />
                </Grid>
                <Grid item xs={6}>
                  <Field name="ccCvv" component={TextField} label="CVC" pattern="\d{3,4}" format={formatCVV(values.ccNumber)} />
                </Grid>
                <Grid item xs={12}>
                  <Field name="ccName" component={TextField} label="Full Name" />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
                    Continue
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        />
      </div>
    }
  </CheckoutContext.Consumer>
)

const styles = theme => ({
  container: {
  },
})

export default withStyles(styles, { withTheme: true })(PaymentForm)