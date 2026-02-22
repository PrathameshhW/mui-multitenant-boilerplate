import { createTheme, ThemeProvider } from "@mui/material/styles";
import type { AppThemeProps } from "../../../common/common.dto";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000",
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

const AppTheme: React.FC<AppThemeProps> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AppTheme;
