/* eslint-disable no-unused-vars */
import * as React from "react";
import PropTypes from "prop-types";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Collapse, 
  Divider, List, ListItemButton, ListItemText, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const IndexDivider = 3;

export default function ItemsNav({items}) {
  const [dropwdownOpen, setdropwdownOpen] = React.useState({
    clientes: false,
    veiculos: false,
    agendamentos: false,
    configuração: false,
    estoque: false
  });

  const limitDividerMenu = 4;

  const onClickDropdown = (item) => {
    const { subItemsDropdown: subItems, name } = item;
    if (subItems.length) {
      const keyForChange = [name.toLocaleLowerCase()];
      setdropwdownOpen({
        ...dropwdownOpen,
        [keyForChange]: !dropwdownOpen[keyForChange]
      });
    } else {
      // função para mdar rota podera ser usado o use navigation
    }
  };

  return (
    <>
      <Toolbar />
      <Divider />
      <List>
        {items.map((item, index) => {
          const {name, subItemsDropdown} = item;
          return (
            <>
              <ListItemButton 
                key={ index }
                onClick={ () => onClickDropdown(item) }
                button=""
              >
                <ListItemText
                  primary={ name }
                />
                {subItemsDropdown.length ?
                  dropwdownOpen[name.toLocaleLowerCase()] 
                    ? <ExpandLess /> : <ExpandMore />
                  : null}
              </ListItemButton>
              {subItemsDropdown.length > 0 &&
              subItemsDropdown.map((subItem) => (
                // eslint-disable-next-line react/jsx-key
                <Collapse
                  in={ dropwdownOpen[name.toLocaleLowerCase()] }
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    <ListItemButton sx={ { pl: 4 } }>
                      <ListItemText primary={ subItem } />
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
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  map: PropTypes.func,
};
