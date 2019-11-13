import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Form } from 'react-final-form'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ListCheckBoxField from 'components/Form/ListCheckBoxField'
import { CheckoutContext } from 'services/checkout'

const getDefaultShipping = (values = []) => {
  const sorted = values.slice().sort((a, b) => {
    if (a.type === 'freeshipping') { return -1 }
    if (a.cost > b.cost) { return 1 }
    if (a.cost < b.cost) { return -1 }
    return 0
  })
  if (Array.isArray(sorted) && sorted.length) { return sorted[0].id }
  return false
}

const MethodForm = ({ classes, handleFormSubmit }) => (
  <CheckoutContext.Consumer>
    {checkoutService =>
      <div className={classes.container}>
        {checkoutService.selectShippingOptionMeta.state === 'FAILURE' ?
          <Typography variant="body1" color="error" gutterBottom>{checkoutService.selectShippingOptionMeta.message}</Typography>
        : null}

        <Form
          onSubmit={(form) => {
            checkoutService.selectShippingOption(form)
              .then(handleFormSubmit)
              .catch(() => { })
          }}
          validate={() => {}}
          initialValues={{ 
            shipping: getDefaultShipping(checkoutService.getShippingOptions())
          }}
          render={({ handleSubmit, values }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={24}>
                <Grid item xs={12}>
                  <ListCheckBoxField options={checkoutService.getShippingOptions()} className={classes.list} />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
                    Continue
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

export default withStyles(styles, { withTheme: true })(MethodForm)