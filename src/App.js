import React from "react";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import RequireAuth from "./components/route/private/RoutesPrivate";
import { createTheme, ThemeProvider } from "@mui/material";
import { connect } from "react-redux";
import { Login, 
  Home, 
  ListClients, 
  NewClient, 
  NewVehicle, 
  NewAgendamento, 
  ListAgendamentos, 
  UsersControl,
  Financeiro,
  Estoque,
  UserInfo,
  ListVehicles,
  NewUser} from "./pages";
import { 
  createLocalUsers, createLocalPerfilPerm } from "./mockRequests/mockCreateDbStorage";
import "./App.css";
import  { ResponsiveDrawer }  from "./components";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

function App({token, themeMode}) {
  const [userHasToken, setUserToken ] = React.useState(null);

  React.useEffect(() => {
    setUserToken(token !== null);
    createLocalUsers();
    createLocalPerfilPerm();
  }, [token]);

  return (
    <ThemeProvider theme={ themeMode === "dark" ? darkTheme : lightTheme }>
      {userHasToken&&
        <ResponsiveDrawer />}
      <Switch>
        <Route
          exact
          path="/"
          render={ () => <Login /> }
        />
        <Route
          path="/Home"
          render={ () => <RequireAuth><Home /></RequireAuth>  }
        />
        <Route
          path="/NewClient"
          render={ () => <RequireAuth><NewClient /></RequireAuth> }
        />
        <Route
          path="/ListClients"
          render={ () => <RequireAuth><ListClients /></RequireAuth> } 
        />
        <Route
          path="/NewVehicle"
          render={ () => <RequireAuth><NewVehicle /></RequireAuth> }
        />
        <Route
          path="/listVehicles"
          render={ () => <RequireAuth><ListVehicles /></RequireAuth> }
        />
        <Route
          path="/NewAgendamento"
          render={ () => <RequireAuth><NewAgendamento /></RequireAuth> } 
        />
        <Route
          path="/ListAgendamentos"
          render={ () => <RequireAuth><ListAgendamentos /></RequireAuth> }
        />
        <Route
          exact
          path="/UsersControl"
          render={ () => <RequireAuth><UsersControl /></RequireAuth> }
        />
        <Route
          path="/UserInfo/:id"
          render={ () => <RequireAuth><UserInfo /></RequireAuth> }
        />
        <Route
          exact
          path="/NewUser"
          render={ () => <RequireAuth><NewUser /></RequireAuth> }
        />

        <Route
          path="/Financeiro"
          render={ () => <RequireAuth><Financeiro /></RequireAuth> }
        />
        <Route path="/Estoque" render={ () => <RequireAuth><Estoque /></RequireAuth> } />
        <Route
          path="*"
          render={ () =>
            <h1 id="notfound">Not found</h1> }
        />

      </Switch>
    </ThemeProvider>

  );
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  themeMode: state.user.config.mode,
});

App.propTypes = {
  token: PropTypes.oneOfType([
    PropTypes.any,
    PropTypes.string,
  ]),
  themeMode: PropTypes.string,
};

export default  connect(mapStateToProps)(App);
