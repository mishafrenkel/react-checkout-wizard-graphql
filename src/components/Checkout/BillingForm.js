import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Form, Field } from 'react-final-form'
import * as yup from 'yup'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import TextField from 'components/Form/TextField'
import SelectField from 'components/Form/SelectField'
import { errorMessages } from 'utils/validation'
import countries from 'utils/countries'
import { CheckoutContext } from 'services/checkout'

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  phone: yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  address1: yup.string().required(),
  address2: yup.string(),
  countryCode: yup.string().required(),
  postalCode: yup.string().required(),
  city: yup.string().required(),
  stateOrProvince: yup.string().required(),
})

const errorSchema = [
  { path: 'email', message: 'Please enter a valid email address' },
  { path: 'phone', message: 'Field is required' },
  { path: 'firstName', message: 'Field is required' },
  { path: 'lastName', message: 'Field is required' },
  { path: 'address1', message: 'Field is required' },
  { path: 'address2', message: 'Field is required' },
  { path: 'countryCode', message: 'Field is required' },
  { path: 'postalCode', message: 'Field is required' },
  { path: 'city', message: 'Field is required' },
  { path: 'stateOrProvince', message: 'Field is required' },
]

const validate = async values => {
  try {
    await validationSchema.validate(values, { abortEarly: false })
  } catch ({ inner }) {
    return errorMessages(errorSchema, inner)
  }
}

const BillingForm = ({ classes, handleFormSubmit }) => (
  <CheckoutContext.Consumer>
    {checkoutService =>
      <div className={classes.container}>
        {checkoutService.updateBillingAddressMeta.state === 'FAILURE' ?
          <Typography variant="body1" color="error" gutterBottom>{checkoutService.updateBillingAddressMeta.message}</Typography>
        : null}

        <Form
          onSubmit={(form) => {
            checkoutService.updateBillingAddress(form)
              .then(handleFormSubmit)
              .catch(() => { })
          }}
          validate={validate}
          initialValues={checkoutService.getShippingAddress()}
          render={({ handleSubmit, pristine }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={24}>
                <Grid item xs={6}>
                  <Field name="email" component={TextField} label="Email Address" />
                </Grid>
                <Grid item xs={6}>
                  <Field name="phone" component={TextField} label="Mobile Phone" />
                </Grid>
                <Grid item xs={6}>
                  <Field name="firstName" component={TextField} label="First Name" />
                </Grid>
                <Grid item xs={6}>
                  <Field name="lastName" component={TextField} label="Last Name" />
                </Grid>
                <Grid item xs={6}>
                  <Field name="address1" component={TextField} label="Address Line 1" />
                </Grid>
                <Grid item xs={6}>
                  <Field name="address2" component={TextField} label="Address Line 2" />
                </Grid>
                <Grid item xs={12}>
                  <Field name="countryCode" component={SelectField} label="Country" options={countries} />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="button">
                    <Link href="/">+ ADD LINE 2</Link>
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Field name="postalCode" component={TextField} label="Zip Code" />
                </Grid>
                <Grid item xs={4}>
                  <Field name="city" component={TextField} label="City" />
                </Grid>
                <Grid item xs={4}>
                  <Field name="stateOrProvince" component={TextField} label="State" />
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

BillingForm.defaultProps = {
}

const styles = theme => ({
  container: {
  },
})

export default withStyles(styles, { withTheme: true })(BillingForm)