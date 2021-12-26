import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
      {location.pathname != "/login"&&
        <ResponsiveDrawer />}
      <Routes>
        <Route path="/login" element={ <Login /> } />
        <Route path="/home" element={ <Home /> } />
        <Route path="/newClient" element={ <NewClient /> } />
        <Route path="/listClients" element={ <ListClients /> } />
        <Route path="/newVehicle" element={ <NewVehicle /> } />
        <Route path="/listVehicles" element={ <ListVehicles /> } />
        <Route path="/agendamento" element={ <NewAgendamento /> } />
        <Route path="/listAgendamentos" element={ <ListAgendamentos /> } />
        <Route path="/users" element={ <UsersControl /> } />
        <Route path="/financeiro" element={ <Financeiro /> } />
        <Route path="/estoque" element={ <Estoque /> } />
        <Route path="*" element={ <h1 id="notfound">Not found</h1> } />
      </Routes>
    </>

  );
}

export default App;
