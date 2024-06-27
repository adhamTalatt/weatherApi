import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: "Cairo",
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <div>
          <Typography variant="h1">السلام عليكم</Typography>
          <h1>السلام عليكم</h1>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
