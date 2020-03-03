import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./index.scss";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/:id" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
