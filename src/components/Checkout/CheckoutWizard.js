/** @format */

import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'

import DeliveryStep from './DeliveryStep'
import ShippingMethodStep from './ShippingMethodStep'
import PaymentMethodStep from './PaymentMethodStep'
import ConfirmationStep from './ConfirmationStep'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  button: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}))

function getSteps() {
  return ['Delivery', 'Shipping Method', 'Payment']
}

export default function HorizontalLinearStepper() {
  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)
  const steps = getSteps()

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  /*
  function handleReset() {
    setActiveStep(0)
  }
  */

  return (
    <div>
      <div className={classes.root}>
        <Stepper activeStep={activeStep}>
          {steps.map(label => {
            const stepProps = {}
            const labelProps = {}
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            )
          })}
        </Stepper>


        <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
          Back
              </Button>
        <Button variant="contained" color="primary" onClick={handleNext} className={classes.button}>
          {activeStep === ste}
        </Button>
      </div>



      <div>
        {activeStep === steps.length ? (
          <ConfirmationStep />
        ) : (
            <div>
              <div>
                {activeStep === 0 && <DeliveryStep handleNext={handleNext} handleBack={handleBack} />}
                {activeStep === 1 && <ShippingMethodStep handleNext={handleNext} handleBack={handleBack} />}
                {activeStep === 2 && <PaymentMethodStep handleNext={handleNext} handleBack={handleBack} />}
              </div>
            </div>
          )}
      </div >
    </div >
  )
}

/*<div>
