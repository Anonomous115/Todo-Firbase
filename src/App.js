import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./Main";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./auth";
import PrivateRoute from "./privateRoute";
import SignUp from "./components/signUp";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Main} />

          <Route exact path="/login" component={Login} />
          <Route exact path="/signUp" component={SignUp} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
