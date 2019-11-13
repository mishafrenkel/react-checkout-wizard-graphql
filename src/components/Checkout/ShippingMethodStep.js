/** @format */

import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Form, Field } from 'lib/form'
import { RadioGroup } from 'lib/form/fields'
import { required } from 'lib/form/validators'
import numeral from 'numeral'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Typography from '@material-ui/core/Typography'

import AppContext from 'AppContext'

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

const ShippingMethodStep = ({ handleNext, handleBack }) => {
  return (
    <AppContext.Consumer>
      {({ availableShippingOptions }) => (
        <Query query={getCustomer} variables={{}}>
          {({ data: { customer }, loading }) =>
            !loading && (
              <Form
                form="ShippingMethodStep"
                mutation={[updateCustomer]}
                initialValues={customer}
                onSubmitSuccess={handleNext}
                onSubmit={({ mutation, data }) => mutation({ variables: { id: customer.id, data } })}
              >
                {({ doc, submiting, submit }) => (
                  <React.Fragment>
                    <Grid container spacing={6}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="h5" component="span">
                          Your Info
                        </Typography>
                        <Button variant="text" style={{ marginLeft: 10 }} onClick={handleBack}>
                          Edit
                        </Button>
                        <Typography variant="caption" component="div">
                          {customer.first_name} {customer.last_name}
                        </Typography>
                        <Typography variant="caption" component="div">
                          {customer.email}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="h5" component="span">
                          Shipping to
                        </Typography>
                        <Button variant="text" style={{ marginLeft: 10 }} onClick={handleBack}>
                          Edit
                        </Button>
                        <Typography variant="caption" component="div">
                          {customer.address1}
                        </Typography>
                        <Typography variant="caption" component="div">
                          {customer.city} {customer.state}, {customer.zip}
                        </Typography>
                      </Grid>
                    </Grid>
                    <br />
                    <br />
                    <Field
                      name="shipping_option_id"
                      component={RadioGroup}
                      label="Choose your shipping method:"
                      options={availableShippingOptions.map(option => ({
                        label: `${option.name} ${numeral(option.price).format('$0.00')}`,
                        value: String(option.id)
                      }))}
                      validate={[required()]}
                    />
                    <ButtonGroup variant="contained" color="primary" onClick={submit} disabled={submiting} fullWidth>
                      <Button>Continue to payment</Button>
                    </ButtonGroup>
                  </React.Fragment>
                )}
              </Form>
            )
          }
        </Query>
      )}
    </AppContext.Consumer>
  )
}

export default ShippingMethodStep

/*
[
              {
                value: 'standard',
                label: (
                  <div>
                    <Typography variant="h5">Standard delivery</Typography>
                  </div>
                )
              },
              {
                value: 'next-day',
                label: (
                  <div>
                    <Typography variant="h5">Next day delivery</Typography>
                  </div>
                )
              }
            ]*/
