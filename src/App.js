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
import  { AlertTogle, ResponsiveDrawer }  from "./components";
import { throwAlert } from "./actions";
import FormNewUser from "./components/forms/FormNewUser";

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

const simulationSeedsDb = () => {
  createLocalUsers();
  createLocalPerfilPerm();
};

function App({token, themeMode,alertOpen, messageAlert, 
  severityAlert, setAlert}) {
  const [userHasToken, setUserHasToken ] = React.useState(null);

  React.useEffect(() => {
    setUserHasToken(token !== null);
    simulationSeedsDb();
  }, [token]);

  return (
    <ThemeProvider theme={ themeMode === "dark" ? darkTheme : lightTheme }>
      {userHasToken&&
        <ResponsiveDrawer />}
      <AlertTogle
        severity={ severityAlert }
        switchValue={ [alertOpen, setAlert] }
      >
        {messageAlert}
      </AlertTogle>
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
          path="/sandbox"
          render={ () => <FormNewUser /> }
        />
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
  alertOpen: state.alertGlobal.open,
  messageAlert: state.alertGlobal.value,
  severityAlert: state.alertGlobal.severity,
});

const mapDispatchToProps = (dispatch) => ({
  setAlert: (payload) => dispatch(throwAlert(payload)),
});

App.propTypes = {
  token: PropTypes.oneOfType([
    PropTypes.any,
    PropTypes.string,
  ]),
  themeMode: PropTypes.string,
  alertOpen: PropTypes.bool,
  messageAlert: PropTypes.string,
  severityAlert: PropTypes.string,
  setAlert: PropTypes.func,
};

export default  connect(mapStateToProps, mapDispatchToProps)(App);
