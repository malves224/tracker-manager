/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import RequireAuth from "./components/route/private/RoutesPrivate";
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
import  { ResponsiveDrawer }  from "./components";


function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/"&&
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
    </>

  );
}

export default App;
