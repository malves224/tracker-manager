import * as React from "react";
import PropTypes from "prop-types";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
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
import { Collapse, 
  Divider, List, ListItemButton, ListItemText, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const IndexDivider = 3;

const getIcon = (nameItem) => { 
  const cssProprietary = {mr: "10px", "font-size": "25px"};
  switch (nameItem) {
  case "Pagina inicial":
    return <HomeIcon color="primary" sx={ cssProprietary } />;
  case "Clientes":
    return <PermContactCalendarIcon color="primary" sx={ cssProprietary } />;
  case "Novo cliente":
    return <AddCircleIcon color="primary" sx={ cssProprietary } />;
  case "Listar Veiculos":
    return <ViewListIcon color="primary" sx={ cssProprietary } />;
  case "Novo veiculo":
    return <AddCircleIcon color="primary" sx={ cssProprietary } />;
  case "Veiculos":
    return <DirectionsCarFilledIcon color="primary" sx={ cssProprietary } />;
  case "Agendamentos":
    return <DateRangeIcon color="primary" sx={ cssProprietary } />;
  case "Novo Agendamento":
    return <AddCircleIcon color="primary" sx={ cssProprietary } />;
  case "Listar Agendamentos":
    return <ViewAgendaIcon color="primary" sx={ cssProprietary } />;
  case "Administração":
    return <AdminPanelSettingsIcon color="primary" sx={ cssProprietary } />;
  case "Usuarios":
    return <SupervisorAccountIcon color="primary" sx={ cssProprietary } />;
  case "Financeiro":
    return <LocalAtmIcon color="primary" sx={ cssProprietary } />;
  case "Estoque":
    return <InventoryIcon color="primary" sx={ cssProprietary } />;
  case "Sair":
    return <ExitToAppIcon color="primary" sx={ cssProprietary } />;
  default:  
    break;
  }
};


export default function ItemsNav({items}) {
  const [dropwdownOpen, setdropwdownOpen] = React.useState({
    clientes: false,
    veiculos: false,
    agendamentos: false,
    configuração: false,
    estoque: false
  });
  const navigate = useNavigate();

  const onClickDropdown = (item) => {
    const { subItemsDropdown: subItems, name, route } = item;
    if (subItems.length) {
      const keyForChange = name.toLocaleLowerCase();
      setdropwdownOpen({
        ...dropwdownOpen,
        [keyForChange]: !dropwdownOpen[keyForChange]
      });
    } else {
      navigate(route);
    }
  };

  return (
    <>
      <Toolbar />
      <Divider />
      <List>
        {items !== undefined &&
        items.map((item, index) => {
          const {name: nameItemPrimary, subItemsDropdown} = item;
          return (
            <>
              <ListItemButton 
                key={ index }
                onClick={ () => onClickDropdown(item) }
              >
                {getIcon(nameItemPrimary)}
                <ListItemText
                  primary={ nameItemPrimary }
                />
                {subItemsDropdown.length ?
                  dropwdownOpen[nameItemPrimary.toLocaleLowerCase()] 
                    ? <ExpandLess /> : <ExpandMore />
                  : null}
              </ListItemButton>
              {subItemsDropdown.length > 0 &&
              subItemsDropdown.map(({name: nameItemSecondary, route}) => (
                <Collapse
                  key={ route }
                  onClick={ () => navigate(route) }
                  in={ dropwdownOpen[nameItemPrimary.toLocaleLowerCase()] }
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    <ListItemButton 
                      sx={ { pl: 4 } }
                    >
                      {getIcon(nameItemSecondary)}
                      <ListItemText primary={ nameItemSecondary } />
                    </ListItemButton>
                  </List>
                </Collapse>
              ))}
              {index === IndexDivider && <Divider />}
              {index === items.length -1 && <Divider />}
            </>);
        })}
      </List>
    </>
  );
}

ItemsNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    subItemsDropdown: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
    route: PropTypes.string,
  })).isRequired,
  map: PropTypes.func,
};
