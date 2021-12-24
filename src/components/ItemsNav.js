import * as React from "react";
import PropTypes from "prop-types";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Collapse, 
  Divider, List, ListItemButton, ListItemText, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const IndexDivider = 3;

const getIcon = (nameItem) => { // implementar restante dos icones
  switch (nameItem) {
  case "Pagina Inicial":
    return <Icon />;
  case "Clientes":
    return <Icon />;
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
