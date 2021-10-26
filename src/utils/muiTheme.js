import { createTheme } from '@mui/material';
import { amber, grey } from '@mui/material/colors';

export const theme = createTheme({
    typography: {
      fontFamily: "S-CoreDream-6Bold",
      color: "#58555A"
    },
    palette: {
        warning: {
            main: amber[500]
        },
        secondary: {
            main: grey[500]
        }
    }
})