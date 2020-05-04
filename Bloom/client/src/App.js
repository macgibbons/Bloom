import React from "react";
import { Redirect, BrowserRouter as Router, Route } from "react-router-dom";
import ApplicationViews from "./components/ApplicationViews";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import { getUser } from "./API/userManager";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Route
          render={() =>
            getUser() ? <ApplicationViews /> : <Redirect to="/login" />
          }
        />
        <Route
          exact
          path="/login"
          render={() => (getUser() ? <Redirect to="/" /> : <Login />)}
        />
        <Route
          exact
          path="/register"
          render={() => (getUser() ? <Redirect to="/" /> : <Register />)}
        />
      </Router>
    </div>
  );
}

export default App;
