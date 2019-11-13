/** @format */

import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'

import AppContext from 'AppContext'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  logo: {
    height: 50
  },
  totalCart: {
    backgroundColor: '#e2e4ea',
    padding: '10px 20px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))

const CheckoutHeader = () => {
  const classes = useStyles()

  return (
    <AppContext.Consumer>
      {({ cart }) => (
        <div className={classes.root}>
          <img className={classes.logo} src="/logo.png" alt="logo" />
          <div className={classes.totalCart}>
            <Icon>shopping_cart</Icon>
            <Typography variant="h6" component="span">
              {cart.total_amount}
            </Typography>
          </div>
        </div>
      )}
    </AppContext.Consumer>
  )
}

export default CheckoutHeader
