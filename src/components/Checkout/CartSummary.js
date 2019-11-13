/** @format */

import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'

import AppContext from 'AppContext'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    color: theme.palette.common.white,
    backgroundColor: theme.palette.text.primary,
    margin: '20px 0'
  }
}))

const CartSummary = () => {
  const classes = useStyles()

  return (
    <AppContext.Consumer>
      {({ cart }) => (
        <Box color="white">
          <Paper className={classes.root}>
            <Typography variant="h4">
              Summary{' '}
              <Typography variant="subtitle1" component="span" color="secondary">
                {cart.number_items} items
              </Typography>
            </Typography>
            <Typography variant="body1" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Subtotal:</span>
              <span>{cart.subtotal_amount}</span>
            </Typography>
            <Typography variant="body1" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Delivery:</span>
              <span>{cart.delivery_amount}</span>
            </Typography>
            <Typography variant="body1" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Tax:</span>
              <span>{cart.formatted_tax_amount}</span>
            </Typography>
            <Typography variant="body1" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Total:</span>
              <span>{cart.total_amount}</span>
            </Typography>
            <List className={classes.root}>
              {Array.from(cart.items || []).map(item => (
                <ListItem key={item.id}>
                  <ListItemAvatar>
                    <Avatar>
                      <img src={item.image_url} alt={item.display_name} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.display_name}
                    secondary={
                      <Typography variant="body2" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>{`QTY: ${item.qty}`}</span>
                        <span>{`PRICE: ${item.unit_price}`}</span>
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
            <Typography variant="h6">Need Help?</Typography>
            <Typography>
              <Icon>call</Icon> Call us on 1-800-123-456
            </Typography>
            <Typography variant="subtitle2">Lines open Mon-Fri 9am-5pm ET</Typography>
          </Paper>
        </Box>
      )}
    </AppContext.Consumer>
  )
}

export default CartSummary
