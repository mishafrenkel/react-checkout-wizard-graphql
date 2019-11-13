/** @format */

import React from 'react'

import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Typography from '@material-ui/core/Typography'

const ConfirmationStep = () => {
  return (
    <div>
      <Typography variant="h3" align="center">
        Your order is complete!
      </Typography>
      <Typography variant="subtitle1" align="center">
        An email confirmation has been sent to test@test.com
      </Typography>
      <ButtonGroup variant="contained" color="primary" fullWidth>
        <Button>Save My Details for a Faster Checkout</Button>
      </ButtonGroup>
    </div>
  )
}

export default ConfirmationStep
