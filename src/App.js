import React from "react";
import { Switch, Route } from "react-router-dom";
import { Login } from "./pages";


function App() {
  return (
    <Switch>
      <Route exact path="/teste" component={ Login } />
    </Switch>
  );
}

export default App;
