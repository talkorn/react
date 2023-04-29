import "./App.css";
import ResponsiveAppBar from "../src/components/Navbar/NavBar";
import { Container } from "@mui/material";
import CardComponent from "../src/components/CardComponents";
import HomePage from "../src/pages/HomePage";
import Router from "../src/routes/Router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <Container>
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
  );
};
export default App;
