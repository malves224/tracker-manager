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
      {location.pathname !== "/login"&&
        <ResponsiveDrawer />}
      <Routes>
        <Route path="/login" element={ <Login /> } />
        <Route path="/" element={ <RequireAuth><Home /></RequireAuth> } />
        <Route path="/newClient" element={ <RequireAuth><NewClient /></RequireAuth> } />
        <Route
          path="/listClients"
          element={ <RequireAuth><ListClients /></RequireAuth> } 
        />
        <Route path="/newVehicle" element={ <RequireAuth><NewVehicle /></RequireAuth> } />
        <Route
          path="/listVehicles"
          element={ <RequireAuth><ListVehicles /></RequireAuth> }
        />
        <Route
          path="/agendamento"
          element={ <RequireAuth><NewAgendamento /></RequireAuth> } 
        />
        <Route
          path="/listAgendamentos"
          element={ <RequireAuth><ListAgendamentos /></RequireAuth> }
        />
        <Route path="/users" element={ <RequireAuth><UsersControl /></RequireAuth> } />
        <Route path="/financeiro" element={ <RequireAuth><Financeiro /></RequireAuth> } />
        <Route path="/estoque" element={ <RequireAuth><Estoque /></RequireAuth> } />
        <Route
          path="*"
          element={ 
            <RequireAuth>
              <h1 id="notfound">Not found</h1> 
            </RequireAuth>
          }
        />
      </Routes>
    </>

  );
}

export default App;
