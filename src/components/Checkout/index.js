/** @format */

import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import CheckoutHeader from './CheckoutHeader'
import CheckoutWizard from './CheckoutWizard'
import CartSummary from './CartSummary'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: 50
  },
  wizardWrapper: {
    padding: theme.spacing(2),
    color: theme.palette.text.primary
  }
}))

const Checkout = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.wizardWrapper}>
            <CheckoutHeader />
            <CheckoutWizard />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CartSummary />
        </Grid>
      </Grid>
    </div>
  )
}

export default Checkout
