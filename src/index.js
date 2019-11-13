import React from 'react'
import ReactDOM from 'react-dom'
import App from 'components/App'
import * as serviceWorker from './serviceWorker'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import './index.css'
import 'typeface-roboto'
import theme from 'services/theme'
import logger, { LoggerContext } from 'services/logger'
import checkoutService from 'services/checkout'
import Modal from 'components/Modal'

const CheckoutService = checkoutService(logger.checkout)

window.QUICK_CHECKOUT = function (element) {
  const Root = () => (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />

      <Modal>
        <LoggerContext.Provider value={logger}>
          <CheckoutService>
            <App />
          </CheckoutService>
        </LoggerContext.Provider>
      </Modal>
    </MuiThemeProvider>
  )

  ReactDOM.render(<Root />, document.getElementById(element))
}

window.QUICK_CHECKOUT('root')

serviceWorker.unregister()
