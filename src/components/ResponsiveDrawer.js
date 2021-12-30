import * as React from "react";
import ItemsNav from "./ItemsNav";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { getItemsNav } from "../mockRequests/mockAPI";
import { getItemsNavAllowed } from "../util/filter";

const drawerWidth = 240;

const INITIAL_ITEMS_MENU = [
  {
    name: "Sair",
    subItemsDropdown: [],
    route: null,
  }
];

function ResponsiveDrawer(props) {
  const { window, getPermissions } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [itemsMenu, setItemsMenu] = React.useState([]);

  const resquesItemsNavAllowed = async (setState) => {
    const response = await getItemsNav(getPermissions);
    const itemsAllowed = getItemsNavAllowed(getPermissions, response);
    setState([...itemsAllowed, ...INITIAL_ITEMS_MENU]);
  };

  React.useEffect(() => {
    resquesItemsNavAllowed(setItemsMenu);
  },[getPermissions]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={ { display: "flex" } }>
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
          <ItemsNav handleDrawerToggle={ handleDrawerToggle } items={ itemsMenu } />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={ {
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          } }
          open
        >
          <ItemsNav handleDrawerToggle={ handleDrawerToggle } items={ itemsMenu } />
        </Drawer>
      </Box>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  getPermissions: state.user.perfilData.permissions,
});

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
  getPermissions: PropTypes.arrayOf(PropTypes.object),
};

export default  connect(mapStateToProps)(ResponsiveDrawer);
