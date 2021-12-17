/* eslint-disable no-unused-vars */
import React from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { Login } from "./pages";
import { NavDrawer } from "./components";


function App() {
  const history = useHistory();
  return (
    <>
      {history.location.pathname != "/login" &&
        <NavDrawer />}
      <Switch>
        <Route exact path="/login" component={ Login } />
        <Route
          exact
          path="/teste"
          component={ () => { 
            return <h2> teste22 </h2>;
          } }
        />

      </Switch>
    </>

  );
}

export default App;
