import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Checkout from 'components/Checkout/Checkout'

const App = ({ classes }) => (
  <div className={classes.container}>
    <Checkout />
  </div>
)

const styles = theme => ({
  container: {
    width: 600,
    margin: '0 auto',
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
  },
})

export default withStyles(styles, { withTheme: true })(App)
