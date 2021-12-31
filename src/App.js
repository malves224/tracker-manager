/* eslint-disable react/prop-types */
import React from "react";
import { Routes, Route } from "react-router-dom";
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
  ListVehicles} from "./pages";
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

function App({user}) {
  const {token, config} = user;
  const [userHasToken, setUserToken ] = React.useState(null);

  React.useEffect(() => {
    setUserToken(token !== null);
  }, [token]);

  return (
    <ThemeProvider theme={ config.mode === "dark" ? darkTheme : lightTheme }>
      {userHasToken&&
        <ResponsiveDrawer />}
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/Home" element={ <RequireAuth><Home /></RequireAuth> } />
        <Route path="/NewClient" element={ <RequireAuth><NewClient /></RequireAuth> } />
        <Route
          path="/ListClients"
          element={ <RequireAuth><ListClients /></RequireAuth> } 
        />
        <Route path="/NewVehicle" element={ <RequireAuth><NewVehicle /></RequireAuth> } />
        <Route
          path="/listVehicles"
          element={ <RequireAuth><ListVehicles /></RequireAuth> }
        />
        <Route
          path="/NewAgendamento"
          element={ <RequireAuth><NewAgendamento /></RequireAuth> } 
        />
        <Route
          path="/ListAgendamentos"
          element={ <RequireAuth><ListAgendamentos /></RequireAuth> }
        />
        <Route
          path="/UsersControl"
          element={ <RequireAuth><UsersControl /></RequireAuth> }
        />
        <Route path="/Financeiro" element={ <RequireAuth><Financeiro /></RequireAuth> } />
        <Route path="/Estoque" element={ <RequireAuth><Estoque /></RequireAuth> } />
        <Route
          path="*"
          element={ 
            <h1 id="notfound">Not found</h1> 
          }
        />
      </Routes>
    </ThemeProvider>

  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default  connect(mapStateToProps)(App);
