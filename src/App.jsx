import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";

//component
import WeatherComponent from "./component/WeatherComponent";

//mui

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: "Cairo",
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100vh",
          }}
          maxWidth="sm"
        >
          <WeatherComponent />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
