import React from 'react'
import winston from 'winston'

const checkoutLogger = winston.createLogger({
  format: winston.format.json(),
  defaultMeta: { service: 'checkout-service' },
  transports: [
    new winston.transports.Console(),
  ]
})

const viewLogger = winston.createLogger({
  format: winston.format.json(),
  defaultMeta: { service: 'view-service' },
  transports: [
    new winston.transports.Console(),
  ]
})

export const LoggerContext = React.createContext()

export default {
  checkout: checkoutLogger,
  view: viewLogger,
}