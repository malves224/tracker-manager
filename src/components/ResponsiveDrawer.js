import * as React from "react";
import ItemsNav from "./ItemsNav";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AccountMenu from "./AcountMenu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { getItemsNav } from "../mockRequests/mockAPI";
import { getItemsNavAllowed } from "../util/filter";
import { useMediaQuery } from "@mui/material";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window, getPermissions } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [itemsMenu, setItemsMenu] = React.useState([]);
  const isScreenMobile = useMediaQuery("(max-width:600px)");

  const resquesItemsNavAllowed = async (setState) => {
    const response = await getItemsNav(getPermissions);
    const itemsAllowed = getItemsNavAllowed(getPermissions, response);
    setState([...itemsAllowed]);
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
        <Toolbar
          sx={ isScreenMobile ? { justifyContent: "space-between" } 
            : { justifyContent: "flex-end" } }
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={ handleDrawerToggle }
            sx={ { mr: 2, display: { sm: "none" } } }
          >
            <MenuIcon />
          </IconButton>
          <AccountMenu />
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
  getNameUser: state.user.fullName,
});

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
  getPermissions: PropTypes.arrayOf(PropTypes.object),
};

export default  connect(mapStateToProps)(ResponsiveDrawer);
