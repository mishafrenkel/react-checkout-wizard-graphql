import { createMuiTheme } from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey'

const theme = createMuiTheme({
  shadows: Array(25),
  typography: {
    useNextVariants: true,
  },
  palette: {
    background: {
      dark: grey[700],
    },
    border: {
      light: 'rgba(0, 0, 0, 0.23)',
    },
  },
})

export default theme