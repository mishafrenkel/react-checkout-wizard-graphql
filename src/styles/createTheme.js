/** @format */

import { createMuiTheme } from '@material-ui/core/styles'

// import purple from '@material-ui/core/colors/purple'
import red from '@material-ui/core/colors/red'
// import orange from '@material-ui/core/colors/orange'

export default () => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#151f26'
      },
      secondary: {
        main: '#ef4511' //'#f4f5f8'
      },
      error: red
    },
    drawerWidth: 250
  })

  return theme
}
