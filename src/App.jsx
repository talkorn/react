import "./App.css";
import ResponsiveAppBar from "../src/components/Navbar/NavBar";
import { Container } from "@mui/material";
import CardComponent from "../src/components/CardComponents";
import HomePage from "../src/pages/HomePage";
import Router from "../src/routes/Router";
const App = () => {
  return (
    <Container>
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
