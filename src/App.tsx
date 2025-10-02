import { BrowserRouter } from "react-router";
import Auth0Setup from "./components/Auth0/Auth0Setup";
import Router from "./utils/Router";

function App() {
  return (
    <BrowserRouter>
      <Auth0Setup>
        <Router />
      </Auth0Setup>
    </BrowserRouter>
  );
}

export default App;
