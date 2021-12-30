/* eslint-disable react/no-multi-comp */
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ViewListIcon from "@mui/icons-material/ViewList";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import ViewAgendaIcon from "@mui/icons-material/ViewAgenda";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import InventoryIcon from "@mui/icons-material/Inventory";


const icons = {
  "Pagina inicial":(sx) => <HomeIcon sx={ sx } />,
  "Clientes": (sx) => <PermContactCalendarIcon sx={ sx } />,
  "Novo": (sx) => <AddCircleIcon sx={ sx } />,
  "Listar Veiculos": (sx) => <ViewListIcon sx={ sx } />,
  "Veiculos": (sx) => <DirectionsCarFilledIcon sx={ sx } />,
  "Agendamentos": (sx) => <DateRangeIcon sx={ sx } />,
  "Listar Agendamentos": (sx) => <ViewAgendaIcon sx={ sx } />,
  "Administração": (sx) => <AdminPanelSettingsIcon sx={ sx } />,
  "Usuarios": (sx) => <SupervisorAccountIcon sx={ sx } />,
  "Financeiro": (sx) => <LocalAtmIcon sx={ sx } />,
  "Estoque": (sx) => <InventoryIcon sx={ sx } />,
  "Sair": (sx) => <ExitToAppIcon sx={ sx } />,
  getIcon: (key, css) => 
    key.includes("Novo")
      ? icons["Novo"](css)
      : icons[key](css),
};

export {
  icons,
};