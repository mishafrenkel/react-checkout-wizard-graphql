import React, { useState, useEffect, useContext } from 'react'
import { Checkout } from 'services/checkout/bigcommerce'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'

export const CheckoutContext = React.createContext()

export const withCheckout = (Component) => (props) => {
  return (
    <CheckoutContext.Consumer>
      {checkoutService =>
        <Component {...props} checkoutService={checkoutService} />
      }
    </CheckoutContext.Consumer>
  )
}

export function useCheckout() {
  return useContext(CheckoutContext);
}

export default function createCheckoutController(loggerService) {
  const checkoutService = Checkout(loggerService)
  
  return function CheckoutController(props) {
    const [subscribed, setSubscribed] = useState({ data: {} })
    const [subscribedMeta, setSubscribedMeta] = useState({ state: 'IDLE', message: null })

    const initialize = async () => {
      try {
        setSubscribedMeta({ state: 'LOADING', message: null })
        await Promise.all([
          checkoutService.loadCheckout(),
          checkoutService.loadShippingCountries(),
          checkoutService.loadShippingOptions(),
          checkoutService.loadBillingCountries(),
          checkoutService.loadPaymentMethods(),
        ])
        await checkoutService.subscribe(setSubscribed)
        setSubscribedMeta({ state: 'SUCCCESS', message: null })
      } catch (error) {
        setSubscribedMeta({ state: 'FAILURE', message: error.message })
        throw new Error(error.message)
      }
    }

    /**
     * 
     */
    const [selectShippingOptionMeta, setSelectShippingOptionMeta] = useState({ state: 'IDLE', message: null })
    const selectShippingOption = async (payload) => {
      setSelectShippingOptionMeta({ state: 'LOADING', message: null })
      try {
        setSelectShippingOptionMeta({ state: 'SUCCCESS', message: null })
        return checkoutService.selectShippingOption(payload.shipping)
      } catch (error) {
        setSelectShippingOptionMeta({ state: 'FAILURE', message: error.message })
        throw new Error(error.message)
      }
    }

    /**
     * 
     */
    const [updateShippingAddressMeta, setUpdateShippingAddressMeta] = useState({ state: 'IDLE', message: null })
    const updateShippingAddress = async (payload) => {
      setUpdateShippingAddressMeta({ state: 'LOADING', message: null })
      try {
        await checkoutService.updateBillingAddress(payload)
        setUpdateShippingAddressMeta({ state: 'SUCCCESS', message: null })
        return checkoutService.updateShippingAddress(payload)
      } catch (error) {
        setUpdateShippingAddressMeta({ state: 'FAILURE', message: error.message })
        throw new Error(error.message)
      }
    }

    /**
     *
     */
    const [updateBillingAddressMeta, setUpdateBillingAddressMeta] = useState({ state: 'IDLE', message: null })
    const updateBillingAddress = async (payload) => {
      setUpdateBillingAddressMeta({ state: 'LOADING', message: null })
      try {
        setUpdateBillingAddressMeta({ state: 'SUCCCESS', message: null })
        return checkoutService.updateBillingAddress(payload)
      } catch (error) {
        setUpdateBillingAddressMeta({ state: 'FAILURE', message: error.message })
        throw new Error(error.message)
      }
    }


    /**
     *
     */
    const [submitOrderMeta, setSubmitOrderMeta] = useState({ state: 'IDLE', message: null })
    const submitOrder = async (payload) => {
      setSubmitOrderMeta({ state: 'LOADING', message: null })
      try {
        await checkoutService.loadPaymentMethods()
        await checkoutService.initializePayment({ methodId: payload.methodId })
        await checkoutService.submitOrder({
          payment: {
            methodId: payload.methodId,
            paymentData: payload.paymentData,
          },
        })
        setSubmitOrderMeta({ state: 'SUCCCESS', message: null })
        window.location.reload(true)
      } catch (error) {
        setSubmitOrderMeta({ state: 'FAILURE', message: error.message })
        throw new Error(error.message)
      }
    }

    /**
     *
     */
    const [applyCouponMeta, setApplyCouponMeta] = useState({ state: 'IDLE', message: null })
    const applyCoupon = async (payload) => {
      setApplyCouponMeta({ state: 'LOADING', message: null })
      try {
        await checkoutService.applyCoupon(payload.couponCode)
        setApplyCouponMeta({ state: 'SUCCCESS', message: null })
      } catch (error) {
        setApplyCouponMeta({ state: 'FAILURE', message: error.message })
        throw new Error(error.message)
      }
    }

    /**
     *
     */
    const [applyGiftCertificateMeta, setApplyGiftCertificateMeta] = useState({ state: 'IDLE', message: null })
    const applyGiftCertificate = async (payload) => {
      setApplyGiftCertificateMeta({ state: 'LOADING', message: null })
      try {
        await checkoutService.applyGiftCertificate(payload.giftCertificateCode)
        setApplyGiftCertificateMeta({ state: 'SUCCCESS', message: null })
      } catch (error) {
        setApplyGiftCertificateMeta({ state: 'FAILURE', message: error.message })
        throw new Error(error.message)
      }
    }

    /**
     *
     */
    const getShippingOptions = (...args) => {
      return subscribed.data.getShippingOptions(...args)
    }

    /**
     *
     */
    const getCustomer = (...args) => {
      return subscribed.data.getCustomer(...args)
    }

    /**
     *
     */
    const getConfig = (...args) => {
      return subscribed.data.getConfig(...args)
    }

    /**
     *
     */
    const getOrder = (...args) => {
      return subscribed.data.getOrder(...args)
    }
    
    /**
     *
     */
    const getContextConfig = (...args) => {
      return subscribed.data.getConfig(...args)
    }

    /**
     *
     */
    const getBillingAddress = (...args) => {
      return subscribed.data.getBillingAddress(...args)
    }

    /**
     *
     */
    const getConsignments = (...args) => {
      return subscribed.data.getConsignments(...args)
    }

    /**
     *
     */
    const getCart = (...args) => {
      return subscribed.data.getCart(...args)
    }

    /**
     *
     */
    const getShippingAddress = (...args) => {
      return subscribed.data.getShippingAddress(...args)
    }

    /**
     *
     */
    const getShippingCountries = (...args) => {
      return subscribed.data.getShippingCountries(...args)
    }

    /**
     *
     */
    const getSelectedShippingOption = (...args) => {
      return subscribed.data.getSelectedShippingOption(...args)
    }

    /**
     *
     */
    const getPaymentMethods = (...args) => {
      return subscribed.data.getPaymentMethods(...args)
    }

    /**
     *
     */
    const getBillingCountries = (...args) => {
      return subscribed.data.getBillingCountries(...args)
    }

    /**
     *
     */
    const getCheckout = (...args) => {
      return subscribed.data.getCheckout(...args)
    }

    /**
     *
     */
    const getFormattedCustomerForm = (...args) => {
      const customer = subscribed.data.getCustomer(...args)
      const address = customer.addresses[0] || {}
      console.log(customer)
      return {
        email: customer.email,
        phone: address.phone,
        firstName: customer.firstName,
        lastName: customer.lastName,
        address1: address.address1,
        address2: address.address2,
        country: address.country,
        countryCode: address.countryCode,
        postalCode: address.postalCode,
        city: address.city,
        stateOrProvince: address.stateOrProvince,
      }
    }

    const exported = {
      initialize,
      state: subscribed,

      selectShippingOptionMeta,
      selectShippingOption,

      updateShippingAddressMeta,
      updateShippingAddress,

      updateBillingAddressMeta,
      updateBillingAddress,

      submitOrderMeta,
      submitOrder,

      applyCouponMeta,
      applyCoupon,

      applyGiftCertificateMeta,
      applyGiftCertificate,

      getShippingOptions,
      getCustomer,
      getConfig,
      getOrder,
      getContextConfig,
      getBillingAddress,
      getConsignments,
      getCart,
      getShippingAddress,
      getShippingCountries,
      getSelectedShippingOption,
      getPaymentMethods,
      getBillingCountries,
      getCheckout,
      getFormattedCustomerForm,
    }

    useEffect(() => {
      if (subscribedMeta.state === 'IDLE') {
        initialize().catch(() => {})
      }
    }, [subscribedMeta.state])

    /**
     * 
     */
    if (subscribedMeta.state === 'LOADING' || subscribedMeta.state === 'IDLE') {
      return (
        <div style={{ width: '100%', height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </div>
      )
    }

    /**
     * 
     */
    if (subscribedMeta.state === 'FAILURE') {
      return (
        <div style={{ width: '100%', height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography>{subscribedMeta.message || 'Error occured'}</Typography>
        </div>
      )
    }

    return (
      <CheckoutContext.Provider value={exported}>
        <div>{props.children}</div>
      </CheckoutContext.Provider>
    )
  }
}
