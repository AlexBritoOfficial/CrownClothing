import Home from "./routes/home/home.component";
import {
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Navigation from "./routes/navigation/navbar.component";
import Authentication from "./routes/authentication/authentication.component";
import { Fragment } from "react/jsx-runtime";

const Shop = () => {
  return (
    <Fragment>
      <h2>I am the Shop</h2>;
      <Outlet />
    </Fragment>
  );
};

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigation />}>
        <Route
          index
          element={<Home />}
        />
        <Route
          path="shop"
          element={<Shop />}
        />
        <Route
          path="auth"
          element={<Authentication />}
        />
      </Route>
    </Routes>
  );
};

export default App;
