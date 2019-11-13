import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Form, Field } from 'react-final-form'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from 'components/Form/TextField'
import { CheckoutContext } from 'services/checkout'

const DetailsForm = ({ classes, handleFormSubmit }) => (
  <CheckoutContext.Consumer>
    {checkoutService =>
      <div className={classes.container}>
        {checkoutService.applyCouponMeta.state === 'FAILURE' ?
          <Typography variant="body1" color="error" gutterBottom>{checkoutService.applyCouponMeta.message}</Typography>
        : null}

        <Form
          onSubmit={(form) => {
            checkoutService.applyCoupon(form)
              .then(handleFormSubmit)
              .catch(() => { })
          }}
          render={({ handleSubmit, pristine }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={24}>
                <div>
                  <Typography variant="h5">Apply Coupon</Typography>
                </div>

                <Grid item xs={12}>
                  <Field name="couponCode" component={TextField} label="Coupon" />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
                    Apply Coupon
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        />


        {checkoutService.applyGiftCertificateMeta.state === 'FAILURE' ?
          <Typography variant="body1" color="error" gutterBottom>{checkoutService.applyGiftCertificateMeta.message}</Typography>
        : null}

        <Form
          onSubmit={(form) => {
            checkoutService.applyGiftCertificate(form)
              .then(handleFormSubmit)
              .catch(() => { })
          }}
          render={({ handleSubmit, pristine }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={24}>
                <div>
                  <Typography variant="h5">Apply Gift Certificate</Typography>
                </div>

                <Grid item xs={12}>
                  <Field name="giftCertificateCode" component={TextField} label="Coupon" />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
                    Apply Coupon
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

const styles = theme => ({
  container: {
  },
  info: {
  },
  list: {
    padding: 0,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.border.light,
    borderRadius: theme.shape.borderRadius,
    marginTop: theme.spacing.unit * 2,
  },
})

export default withStyles(styles, { withTheme: true })(DetailsForm)