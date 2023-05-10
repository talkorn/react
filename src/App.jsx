import "./App.css";
import {
  Container,
  ThemeProvider,
  createTheme,
  Switch,
  CssBaseline,
} from "@mui/material";

import ResponsiveAppBar from "../src/components/Navbar/NavBar";
import { useEffect, useState } from "react";
import CardComponent from "../src/components/CardComponents";
import HomePage from "../src/pages/HomePage";
import Router from "../src/routes/Router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import useLoggedIn from "./hooks/useLoggedIn";
import SimpleBottomNavigation from "../src/components/footer";
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
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const loggedIn = useLoggedIn();
  useEffect(() => {
    (async () => {
      await loggedIn();
      setIsLoading(false);
    })();
  }, []);
  const isDarkMode = useSelector((store) => store.darkModeSlice.isDarkMode);
  return (
    <ThemeProvider theme={isDarkMode ? createTheme(dark) : createTheme(light)}>
      <CssBaseline />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="colored"
      />
      <Container sx={{ bgcolor: "background.default" }}>
        <header>
          <ResponsiveAppBar />
        </header>
        <main>
          <Router />
        </main>
        <footer>
          <SimpleBottomNavigation />
        </footer>
      </Container>
    </ThemeProvider>
  );
}
export default App;
