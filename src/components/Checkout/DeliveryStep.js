/** @format */

import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Form, Field } from 'lib/form'
import { TextField } from 'lib/form/fields'
import { required, email } from 'lib/form/validators'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'

const createCustomer = gql`
  mutation createCustomer($data: CustomerInput) {
    createCustomer(data: $data) {
      id
      email
      phone
      first_name
      last_name
      company_name
      address1
      address2
      country
      city
      state
      zip
    }
  }
`

const getCustomer = gql`
  query getCustomer($cartId: Int) {
    customer(cartId: $cartId) {
      id
      email
      phone
      first_name
      last_name
      company_name
      address1
      address2
      country
      city
      state
      zip
    }
  }
`

const DeliveryStep = ({ handleNext }) => {
  return (
    <Query query={getCustomer} variables={{}}>
      {({ data: { customer }, loading }) =>
        !loading && (
          <Form form="DeliveryStep" mutation={[createCustomer]} initialValues={customer} onSubmitSuccess={handleNext}>
            {({ doc, submiting, submit }) => (
              <React.Fragment>
                <Grid container spacing={6}>
                  <Grid item xs={12} sm={6}>
                    <Field name="email" component={TextField} label="Email Address" variant="filled" validate={[required(), email()]} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field name="phone" component={TextField} label="Phone Number" variant="filled" />
                  </Grid>
                </Grid>
                <Grid container spacing={6}>
                  <Grid item xs={12} sm={6}>
                    <Field name="first_name" component={TextField} label="First Name" variant="filled" validate={[required()]} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field name="last_name" component={TextField} label="Last Name" variant="filled" validate={[required()]} />
                  </Grid>
                </Grid>
                <Field name="company_name" component={TextField} label="Company Name" variant="filled" />
                <Grid container spacing={6}>
                  <Grid item xs={12} sm={6}>
                    <Field name="address_line_1" component={TextField} label="Address Line 1" variant="filled" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field name="country" component={TextField} label="Country" variant="filled" />
                  </Grid>
                </Grid>
                <Field name="address_line_2" component={TextField} label="Address Line 2" variant="filled" />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Field name="city" component={TextField} label="City" variant="filled" />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Field name="state" component={TextField} label="State" variant="filled" />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Field name="zip" component={TextField} label="ZIP code" variant="filled" />
                  </Grid>
                </Grid>
                <ButtonGroup variant="contained" color="primary" onClick={submit} disabled={submiting} fullWidth>
                  <Button>Continue to shipping method</Button>
                </ButtonGroup>
              </React.Fragment>
            )}
          </Form>
        )
      }
    </Query>
  )
}

export default DeliveryStep
