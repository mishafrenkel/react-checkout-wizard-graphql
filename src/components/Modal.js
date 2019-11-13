import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MuiModal from '@material-ui/core/Modal'
import MuiButton from '@material-ui/core/Button'

const Modal = ({ children, classes }) => {
  const [visible, setVisible] = useState(false)

  const handleModalOpen = () => setVisible(true)
  const handleModalClose = () => setVisible(false)

  return (<>
    <MuiButton variant="contained" color="primary" onClick={handleModalOpen}>Quickcheckout</MuiButton>

    <MuiModal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={visible}
      className={classes.modal}
      onClose={handleModalClose}
      style={{ zIndex: '9998' }}
    >
      <div className={classes.paper}>
        {children}
      </div>
    </MuiModal>
  </>)
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    outline: 'none',
    width: 600,
    margin: '0 auto',
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
  },
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default withStyles(styles)(Modal)