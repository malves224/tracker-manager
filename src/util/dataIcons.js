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
  "Pagina inicial":(sx) => <HomeIcon color="primary" sx={ sx } />,
  "Clientes": (sx) => <PermContactCalendarIcon color="primary" sx={ sx } />,
  "Novo": (sx) => <AddCircleIcon color="primary" sx={ sx } />,
  "Listar Veiculos": (sx) => <ViewListIcon color="primary" sx={ sx } />,
  "Veiculos": (sx) => <DirectionsCarFilledIcon color="primary" sx={ sx } />,
  "Agendamentos": (sx) => <DateRangeIcon color="primary" sx={ sx } />,
  "Listar Agendamentos": (sx) => <ViewAgendaIcon color="primary" sx={ sx } />,
  "Administração": (sx) => <AdminPanelSettingsIcon color="primary" sx={ sx } />,
  "Usuarios": (sx) => <SupervisorAccountIcon color="primary" sx={ sx } />,
  "Financeiro": (sx) => <LocalAtmIcon color="primary" sx={ sx } />,
  "Estoque": (sx) => <InventoryIcon color="primary" sx={ sx } />,
  "Sair": (sx) => <ExitToAppIcon color="primary" sx={ sx } />,
  getIcon: (key, css) => 
    key.includes("Novo")
      ? icons["Novo"](css)
      : icons[key](css),
};

export {
  icons,
};