import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import SwipeableViews from 'react-swipeable-views'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import HeaderForm from 'components/Checkout/HeaderForm'
import DetailsForm from 'components/Checkout/DetailsForm'
import ShippingForm from 'components/Checkout/ShippingForm'
import Confirmation from 'components/Checkout/Confirmation'
import MethodForm from 'components/Checkout/MethodForm'
import PaymentForm from 'components/Checkout/PaymentForm'
import { LoggerContext } from 'services/logger'

const TabContainer = ({ children, dir }) => (
  <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
    {children}
  </Typography>
)

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
}

const FullWidthTabs = ({ classes, theme }) => {
  const [tabIndex, setTabIndex] = useState(0)
  const handleChange = (loggerService) => (event, value) => {
    loggerService.info({ method: 'view:handleChange' })
    setTabIndex(value)
  }

  const handleChangeIndex = (loggerService) => index => {
    loggerService.info({ method: 'view:handleChangeIndex' })
    setTabIndex(index)
  }

  const handleFormSubmit = () => {
    setTabIndex(tabIndex + 1)
  }

  return (
    <LoggerContext.Consumer>
      {loggerService =>
        <div className={classes.container}>
          <HeaderForm />

          <AppBar position="static" color="default">
            <Tabs
              value={tabIndex}
              onChange={handleChange(loggerService.view)}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Details" />
              <Tab label="Shipping Info" />
              <Tab label="Method" />
              <Tab label="Payment" />
            </Tabs>
          </AppBar>
          <SwipeableViews
            index={tabIndex}
            onChangeIndex={handleChangeIndex(loggerService.view)}
          >
            <TabContainer dir={theme.direction}>
              <DetailsForm handleFormSubmit={handleFormSubmit} />
            </TabContainer>
            <TabContainer dir={theme.direction}>
              <ShippingForm handleFormSubmit={handleFormSubmit} />
            </TabContainer>
            <TabContainer dir={theme.direction}>
              <MethodForm handleFormSubmit={handleFormSubmit} />
            </TabContainer>
            <TabContainer dir={theme.direction}>
              <PaymentForm handleFormSubmit={handleFormSubmit} />
            </TabContainer>
            <TabContainer dir={theme.direction}>
              <Confirmation handleFormSubmit={handleFormSubmit} />
            </TabContainer>
          </SwipeableViews>
        </div>
      }
    </LoggerContext.Consumer>
  )
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

const styles = theme => ({
  container: {
    backgroundColor: theme.palette.background.paper,
  },
})

export default withStyles(styles, { withTheme: true })(FullWidthTabs)
