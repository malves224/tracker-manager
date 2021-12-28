import * as React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import storage from "../util/storage/store";
import { ExpandLess, ExpandMore,
} from "@mui/icons-material";
import { Collapse, 
  Divider, List, ListItemButton, ListItemText, Toolbar } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { logOffUser } from "../actions";
import { icons } from "../util/dataIcons";

const IndexDivider = 3;


function ItemsNav({items, handleDrawerToggle: togle, logOff }) {
  const [dropwdownOpen, setdropwdownOpen] = React.useState({
    clientes: false,
    veiculos: false,
    agendamentos: false,
    configuração: false,
    estoque: false
  });
  const navigate = useNavigate();
  const location = useLocation();

  const onClickDropdown = (item) => {
    const { subItemsDropdown: subItems, name, route } = item;
    if (subItems.length) {
      const keyForChange = name.toLocaleLowerCase();
      setdropwdownOpen({
        ...dropwdownOpen,
        [keyForChange]: !dropwdownOpen[keyForChange]
      });
    } else if(name === "Sair") {
      storage.remove("token");// BACK-END Função que irá deslogar o usuario
      logOff();
      navigate("/");
    } else {
      navigate(route);
      togle();
    }
  };

  const onClickDropdownSubItem = (route) => {
    navigate(route);
    togle();
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
                selected={ item.route === location.pathname }
                key={ index }
                onClick={ () => onClickDropdown(item) }
              >
                {icons.getIcon(nameItemPrimary,{mr: "10px", "font-size": "25px"})}
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
                  onClick={ () => onClickDropdownSubItem(route) }
                  in={ dropwdownOpen[nameItemPrimary.toLocaleLowerCase()] }
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    <ListItemButton
                      selected={ route === location.pathname }
                      sx={ { pl: 4 } }
                    >
                      {icons.getIcon(nameItemSecondary,{mr: "10px", "font-size": "25px"})}
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
  handleDrawerToggle: PropTypes.func,
  logOff: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  logOff: (payload) => dispatch(logOffUser(payload)),
});

export default connect(null, mapDispatchToProps)(ItemsNav);
