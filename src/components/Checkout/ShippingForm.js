import React, { useRef } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Form, Field } from 'react-final-form'
import * as yup from 'yup'
import { AsYouType } from 'libphonenumber-js/min'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Autocomplete from 'components/Form/Autocomplete'
import TextField from 'components/Form/TextField'
import WhenFieldChanges from 'components/Form/WhenFieldChanges'
import { errorMessages } from 'utils/validation'
import { withCheckout } from 'services/checkout'
import maps from 'services/maps'

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

const getCountry = (countries, country) => {
  const selected = countries.find((element) => {
    return element.name === country
  })
  return (selected || {}).code
}

const ShippingForm = ({ classes, handleFormSubmit, checkoutService }) => {
  const addressRef = useRef(null)

  return (
    <div className={classes.container}>
      <Form
        onSubmit={async (form) => {
          await checkoutService.updateShippingAddress(form)
          handleFormSubmit()
        }}
        validate={validate}
        initialValues={checkoutService.getFormattedCustomerForm()}
        render={({ handleSubmit, form, values }) => (
          <form>
            {(() => {
              maps(addressRef, (address) => {
                if (address.postal_code) {
                  form.change('postalCode', address.postal_code)
                }
                if (address.country) {
                  form.change('country', address.country)
                  form.change('countryCode', getCountry(checkoutService.getBillingCountries(), address.country))
                }
                if (address.administrative_area_level_1) {
                  form.change('stateOrProvince', address.administrative_area_level_1)
                }
                if (address.locality) {
                  form.change('city', address.locality)
                }
              })
            })()}
            <WhenFieldChanges
              field="country"
              becomes={values.country !== null}
              set="countryCode"
              to={getCountry(checkoutService.getBillingCountries(), values.country)}
            />
            <Grid container spacing={24}>
              <Grid item xs={6}>
                <Field name="email" component={TextField} label="Email Address" />
              </Grid>
              <Grid item xs={6}>
                <Field name="phone" component={TextField} label="Mobile Phone" format={value => {
                  if (/(.?\d){4,}/.test(value)) {
                    return new AsYouType('US').input(value)
                  }
                  return value || ''
                }} />
              </Grid>
              <Grid item xs={6}>
                <Field name="firstName" component={TextField} label="First Name" />
              </Grid>
              <Grid item xs={6}>
                <Field name="lastName" component={TextField} label="Last Name" />
              </Grid>
              <Grid item xs={6}>
                <Field name="address1" component={TextField} label="Address Line 1" inputRef={addressRef} autoComplete="disabled" />
              </Grid>
              <Grid item xs={6}>
                <Field name="address2" component={TextField} label="Address Line 2" autoComplete="disabled" />
              </Grid>
              <Grid item xs={12}>
                <Field name="country" component={Autocomplete} options={checkoutService.getBillingCountries()} autoComplete="disabled" />
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
                <Button type="submit" variant="contained" color="primary" size="large" fullWidth onClick={handleSubmit}>
                  Continue
              </Button>
              </Grid>
            </Grid>
          </form>
        )}
      />
    </div>
  )
}

ShippingForm.defaultProps = {
}

const styles = theme => ({
  container: {
  },
})

export default withStyles(styles, { withTheme: true })(
  withCheckout(ShippingForm)
)