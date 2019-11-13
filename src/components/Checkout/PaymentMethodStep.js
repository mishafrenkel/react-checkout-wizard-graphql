/** @format */

import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Form, Field } from 'lib/form'
import { TextField } from 'lib/form/fields'
import { required } from 'lib/form/validators'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'

const updateCustomer = gql`
  mutation updateCustomer($id: Int, $data: CustomerInput) {
    updateCustomer(id: $id, data: $data) {
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
      shipping_option_id
    }
  }
`

const PaymentMethodStep = ({ handleNext }) => {
  return (
    <Query query={getCustomer} variables={{}}>
      {({ data: { customer }, loading }) =>
        !loading && (
          <Form
            form="PaymentMethodStep"
            mutation={[updateCustomer]}
            initialValues={customer}
            onSubmitSuccess={handleNext}
            onSubmit={({ mutation, data }) => mutation({ variables: { id: customer.id, data } })}
          >
            {({ doc, submiting, submit }) => (
              <React.Fragment>
                <Field name="payment_option.credit_card" component={TextField} label="Card Number" variant="filled" validate={[required()]} />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field name="payment_option.cardholder_name" component={TextField} label="Name as it appears on card" variant="filled" />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Field name="payment_option.exp_month" component={TextField} label="mm" variant="filled" validate={[required()]} />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Field name="payment_option.exp_year" component={TextField} label="yy" variant="filled" validate={[required()]} />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Field name="payment_option.cvc" component={TextField} label="CSV" variant="filled" validate={[required()]} />
                  </Grid>
                </Grid>
                <br />
                <br />
                <ButtonGroup variant="contained" color="secondary" onClick={submit} disabled={submiting} fullWidth>
                  <Button>Pay $30 securely</Button>
                </ButtonGroup>
              </React.Fragment>
            )}
          </Form>
        )
      }
    </Query>
  )
}

export default PaymentMethodStep
