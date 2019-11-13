import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Popover from 'components/Popover'
import { CheckoutContext } from 'services/checkout'

const HeaderForm = ({ classes }) => (
  <CheckoutContext.Consumer>
    {checkoutService =>
      <div className={classes.container}>
        <Grid container spacing={24}>
          <Grid item xs={6} className={classes.logo}>
            <Typography variant="h5">Quick Checkout</Typography>
          </Grid>
          <Grid item xs={6} className={classes.coupon}>
            <Popover />
          </Grid>
        </Grid>
      </div>
    }
  </CheckoutContext.Consumer>
)

const styles = theme => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    padding: 24,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
  coupon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  select: {
    width: 100,
    marginLeft: theme.spacing.unit * 2,
  },
})

export default withStyles(styles, { withTheme: true })(HeaderForm)