import "./App.css";
import {
  Container,
  ThemeProvider,
  createTheme,
  Switch,
  CssBaseline,
} from "@mui/material";
import ResponsiveAppBar from "../src/components/Navbar/NavBar";

import CardComponent from "../src/components/CardComponents";
import HomePage from "../src/pages/HomePage";
import Router from "../src/routes/Router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
const light = {
  palette: {
    mode: "light",
  },
};

const dark = {
  palette: {
    mode: "dark",
  },
};
const App = () => {
  const isDarkMode = useSelector((store) => store.darkModeSlice.isDarkMode);
  return (
    <ThemeProvider theme={isDarkMode ? createTheme(dark) : createTheme(light)}>
      <Container sx={{ bgcolor: "background.default" }}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />

        <header>
          <ResponsiveAppBar />
        </header>
        <main>
          <Router />
        </main>
        <footer></footer>
      </Container>
    </ThemeProvider>
  );
};
export default App;
