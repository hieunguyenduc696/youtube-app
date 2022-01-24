import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Videos from "./video/pages/Videos";
import NewVideo from "./video/pages/NewVideo";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Videos />
        </Route>
        <Route path="/videos/new" exact>
          <NewVideo />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
