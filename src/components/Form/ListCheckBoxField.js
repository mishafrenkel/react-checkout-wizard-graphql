import React from 'react'
import Radio from '@material-ui/core/Radio'
import ListItemText from '@material-ui/core/ListItemText'
import RadioGroup from '@material-ui/core/RadioGroup'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { Field } from 'react-final-form'

const RadioInput = ({ input }) => (
  <Radio
    {...input}
  />
)

const Wire = ({ children, ...props }) => children(props)

export default ({ options, className, ...props }) => {
  if (!options || !options.length) {
    return null
  }

  return (
    <RadioGroup value={null}>
      <Wire>
        {props => 
          <List className={className}>
            {options.map(item => (
              <ListItem key={item.id} role={undefined} dense disableGutters>
                <Field name="shipping" type="radio" value={item.id} component={RadioInput} />
                
                <ListItemText primary={item.description} />
                <ListItemText primary={item.cost || 'Free'} primaryTypographyProps={{ align: 'right' }} />
              </ListItem>
            ))}
          </List>
        }
      </Wire>
    </RadioGroup>
  )
}