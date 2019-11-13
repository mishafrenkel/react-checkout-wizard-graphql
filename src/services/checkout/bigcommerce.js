import { createCheckoutService } from '@bigcommerce/checkout-sdk'

const service = createCheckoutService()

export const Checkout = (logger) => {
  const getCart = (...args) => {
    logger.info({ method: 'checkout:getCart', ...args })
    return service.getCart(...args)
  }

  const getBillingAddress = (...args) => {
    logger.info({ method: 'checkout:getBillingAddress', ...args })
    return service.getBillingAddress(...args)
  }

  const getShippingAddress = (...args) => {
    logger.info({ method: 'checkout:getShippingAddress', ...args })
    return service.getShippingAddress(...args)
  }

  const getShippingOptions = (...args) => {
    logger.info({ method: 'checkout:getShippingOptions', ...args })
    return service.getShippingOptions(...args)
  }

  const selectShippingOption = (...args) => {
    logger.info({ method: 'checkout:selectShippingOption', ...args })
    return service.selectShippingOption(...args)
  }

  const getSelectedShippingOption = (...args) => {
    logger.info({ method: 'checkout:getSelectedShippingOption', ...args })
    return service.getSelectedShippingOption(...args)
  }

  const updateBillingAddress = (...args) => {
    logger.info({ method: 'checkout:updateBillingAddress', ...args })
    return service.updateBillingAddress(...args)
  }

  const applyCoupon = (...args) => {
    logger.info({ method: 'checkout:applyCoupon', ...args })
    return service.applyCoupon(...args)
  }

  const applyGiftCertificate = (...args) => {
    logger.info({ method: 'checkout:applyGiftCertificate', ...args })
    return service.applyGiftCertificate(...args)
  }

  const removeCoupon = (...args) => {
    logger.info({ method: 'checkout:removeCoupon', ...args })
    return service.removeCoupon(...args)
  }

  const removeGiftCertificate = (...args) => {
    logger.info({ method: 'checkout:removeGiftCertificate', ...args })
    return service.removeGiftCertificate(...args)
  }

  const loadPaymentMethods = (...args) => {
    logger.info({ method: 'checkout:loadPaymentMethods', ...args })
    return service.loadPaymentMethods(...args)
  }

  const getPaymentMethods = (...args) => {
    logger.info({ method: 'checkout:getPaymentMethods', ...args })
    return service.getPaymentMethods(...args)
  }

  const initializePayment = (...args) => {
    logger.info({ method: 'checkout:initializePayment', ...args })
    return service.initializePayment(...args)
  }

  const submitOrder = (...args) => {
    logger.info({ method: 'checkout:submitOrder', ...args })
    return service.submitOrder(...args)
  }

  const loadCheckout = (...args) => {
    logger.info({ method: 'checkout:loadCheckout', ...args })
    return service.loadCheckout(...args)
  }

  const finalizeOrderIfNeeded = (...args) => {
    logger.info({ method: 'checkout:finalizeOrderIfNeeded', ...args })
    return service.finalizeOrderIfNeeded(...args)
  }

  const signInCustomer = (...args) => {
    logger.info({ method: 'checkout:signInCustomer', ...args })
    return service.signInCustomer(...args)
  }

  const getCustomer = (...args) => {
    logger.info({ method: 'checkout:getCustomer', ...args })
    return service.getCustomer(...args)
  }

  const updateShippingAddress = (...args) => {
    logger.info({ method: 'checkout:updateShippingAddress', ...args })
    return service.updateShippingAddress(...args)
  }

  const loadShippingCountries = (...args) => {
    logger.info({ method: 'checkout:loadShippingCountries', ...args })
    return service.loadShippingCountries(...args)
  }

  const loadShippingOptions = (...args) => {
    logger.info({ method: 'checkout:loadShippingOptions', ...args })
    return service.loadShippingOptions(...args)
  }

  const loadBillingCountries = (...args) => {
    logger.info({ method: 'checkout:loadBillingCountries', ...args })
    return service.loadBillingCountries(...args)
  }

  const continueAsGuest = (...args) => {
    logger.info({ method: 'checkout:continueAsGuest', ...args })
    return service.continueAsGuest(...args)
  }

  const subscribe = (...args) => {
    logger.info({ method: 'checkout:subscribe' })
    return service.subscribe(...args)
  }
  

  return {
    subscribe,
    getCart,
    getBillingAddress,
    getShippingAddress,
    getShippingOptions,
    selectShippingOption,
    getSelectedShippingOption,
    updateBillingAddress,
    applyCoupon,
    applyGiftCertificate,
    removeCoupon,
    removeGiftCertificate,
    loadPaymentMethods,
    getPaymentMethods,
    initializePayment,
    submitOrder,
    loadCheckout,
    finalizeOrderIfNeeded,
    signInCustomer,
    getCustomer,
    updateShippingAddress,
    loadShippingCountries,
    loadShippingOptions,
    loadBillingCountries,
    continueAsGuest,
  }
}