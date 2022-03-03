import { IconButton, Collapse, Alert } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";



const AlertTogle = ({severity, children, switchValue}) => {
  const [alertOpen, setAlertOpen] = switchValue;
  const TIME_FOR_CLOSE_ALERT = 3000;

  alertOpen && setTimeout(() => setAlertOpen({open: false}), TIME_FOR_CLOSE_ALERT);

  return (
    <Collapse
      sx={ {position: "fixed", 
        top:"5px", left: "30%", zIndex:"99999"} }
      in={ alertOpen }
    >
      <Alert
        severity={ severity }
        variant="filled"
        action={
          <IconButton
            aria-label="close"
            size="medium"
            onClick={ () => {
              setAlertOpen({open: false});
            } }
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={ { mb: 2, width: "80%" } }
      >
        {children}
      </Alert>
    </Collapse>
  );
};

AlertTogle.propTypes = {
  severity: PropTypes.string,
  children: PropTypes.node,
  switchValue: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
  ]))
};


export default AlertTogle;
