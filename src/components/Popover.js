import React from 'react'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'
import { CheckoutContext } from 'services/checkout'

function SimplePopover() {
  const [anchorEl, setAnchorEl] = React.useState(null)

  function handleClick(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : null

  return (
    <CheckoutContext.Consumer>
      {checkoutService =>
        <>
          <div onClick={handleClick}>
            <Typography variant="h5">{checkoutService.getCart().currency.symbol}{checkoutService.getCart().cartAmount}</Typography>
          </div>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            style={{ zIndex: '9999' }}
          >
            {checkoutService.getCart().lineItems.physicalItems.map(item => (
              <div key={item.sku}>
                <img src={item.imageUrl} style={{ width: 30, height: 30 }} alt="" />
                <Typography>{item.brand} - {item.name}:</Typography>
                <Typography>list price: {checkoutService.getCart().currency.symbol}{item.extendedListPrice}</Typography>
                <Typography>sale price: {checkoutService.getCart().currency.symbol}{item.extendedSalePrice}</Typography>

                <hr />
              </div>
            ))}

            <Typography>shipping cost: {checkoutService.getCheckout().shippingCostTotal}</Typography>
            <Typography>tax total: {checkoutService.getCheckout().taxTotal}</Typography>
            <Typography>grand total: {checkoutService.getCheckout().grandTotal}</Typography>
          </Popover>
        </>
      }
    </CheckoutContext.Consumer>
  )
}

export default SimplePopover