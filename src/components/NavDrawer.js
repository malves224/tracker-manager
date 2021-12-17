import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import { Collapse } from "@mui/material";

const drawerWidth = 240;

const limitDividerMenu = 4;

const itemsMenu = [
  {
    name: "Pagina inicial",
    subItemsDropdown: [],
    src: "/",
  },
  {
    name: "Clientes",
    subItemsDropdown: ["Novo cliente", "Clientes"],
  },
  {
    name: "Veiculos",
    subItemsDropdown: ["Novo veiculo", "Veiculos"],
  },
  {
    name: "Agendamentos",
    subItemsDropdown: ["Novo Agendamento", "Agendamentos"],
  },
  {
    name: "Configuração",
    subItemsDropdown: ["Usuarios", "Financeiro", "Estoque"],
  },
  {
    name: "Estoque",
    subItemsDropdown: [],
  },
  {
    name: "Sair",
    subItemsDropdown: [],
  }
];

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [dropwdownOpen, setdropwdownOpen] = React.useState({
    clientes: false,
    veiculos: false,
    agendamentos: false,
    configuração: false,
    estoque: false
  });

  const onClickDropdown = ({target}, hasDropwdown) => {
    if (hasDropwdown) {
      const keyForChange = [target.innerText.toLocaleLowerCase()];
      setdropwdownOpen({
        ...dropwdownOpen,
        [keyForChange]: !dropwdownOpen[keyForChange]
      });
    } else {
      console.log("redirect");
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {itemsMenu.slice(0, limitDividerMenu).map(({ name, subItemsDropdown }, index) => (
          <>
            <ListItemButton key={ index }button>
              <ListItemText
                onClick={ (ev) => onClickDropdown(ev, subItemsDropdown.length) }
                primary={ name }
              />
              {subItemsDropdown.length ?
                dropwdownOpen[name.toLocaleLowerCase()] ? <ExpandLess /> : <ExpandMore />
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
                    <ListItemButton button sx={ { pl: 4 } }>
                      <ListItemText primary={ subItem } />
                    </ListItemButton>
                  </List>
                </Collapse>
              ))}
          </>
        ))}
      </List><Divider />
      <List>
        {["Estoque", "Financeiro", "Configuração", "Sair"].map(function (text) {
          return (
            <ListItemButton button key={ text }>
              <ListItemText primary={ text } />
            </ListItemButton>
          );
        })}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={ { display: "flex" } }>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={ {
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        } }
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={ handleDrawerToggle }
            sx={ { mr: 2, display: { sm: "none" } } }
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={ { width: { sm: drawerWidth }, flexShrink: { sm: 0 } } }
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={ container }
          variant="temporary"
          open={ mobileOpen }
          onClose={ handleDrawerToggle }
          ModalProps={ {
            keepMounted: true, // Better open performance on mobile.
          } }
          sx={ {
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          } }
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={ {
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          } }
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={ { flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } } }
      >
        <Toolbar />
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
