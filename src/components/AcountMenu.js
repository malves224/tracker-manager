/* eslint-disable no-unused-vars */
import * as React from "react";
import Box from "@mui/material/Box";
import storage from "../util/storage/store";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import { connect } from "react-redux";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { logOffUser } from "../actions";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

function AccountMenu({getNameUser, logOff}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSair = () => {
    storage.remove("token");// BACK-END Função que irá deslogar o usuario
    storage.remove("dataUser");// BACK-END Função que irá deslogar o usuario
    logOff();
    navigate("/");  
  };
  
  return (
    <>
      <Box sx={ { display: "flex", alignItems: "center", textAlign: "center" } }>
        <Tooltip title="Account settings">
          <IconButton
            onClick={ handleClick }
            size="small"
            sx={ { ml: 2 } }
            aria-controls={ open ? "account-menu" : undefined }
            aria-haspopup="true"
            aria-expanded={ open ? "true" : undefined }
          >
            <Avatar
              sx={ { width: 32, height: 32 } }
            >{getNameUser[0].toUpperCase()}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={ anchorEl }
        id="account-menu"
        open={ open }
        onClose={ handleClose }
        onClick={ handleClose }
        PaperProps={ {
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            "&:before": {
              content: "\"\"",
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0
            }
          }
        } }
        transformOrigin={ { horizontal: "right", vertical: "top" } }
        anchorOrigin={ { horizontal: "right", vertical: "bottom" } }
      >
        <MenuItem>{getNameUser}</MenuItem>
        <MenuItem>
          <Avatar />
          My account
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Configuração
        </MenuItem>
        <MenuItem onClick={ handleSair }>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          Sair
        </MenuItem>
      </Menu>
    </>
  );
}

const mapStateToProps = (state) => ({
  getNameUser: state.user.fullName,
});

const mapDispatchToProps = (dispatch) => ({
  logOff: (payload) => dispatch(logOffUser(payload)),
});

AccountMenu.propTypes = {
  getNameUser: PropTypes.string,
  logOff: PropTypes.func.isRequired,
};



export default connect(mapStateToProps, mapDispatchToProps)(AccountMenu);
