import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { CheckoutContext } from 'services/checkout'

const Confirmation = ({ classes, handleFormSubmit }) => (
  <CheckoutContext.Consumer>
    {checkoutService =>
      <div className={classes.container}>
        <Typography variant="body1" align="center" gutterBottom>
          Congratulations, your order has been successfully submitted!
        </Typography>
      </div>
    }
  </CheckoutContext.Consumer>
)

const styles = theme => ({
  container: {
  },
})

export default withStyles(styles, { withTheme: true })(Confirmation)