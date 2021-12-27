import { IconButton, Collapse, Alert } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";


const AlertTogle = ({alertOptions, children}) => {
  const { 
    isOpen, 
    severity,
    setOpen 
  } = alertOptions;
  return (
    <Collapse sx={ {position: "absolute", top:"5px", left: "30%"} } in={ isOpen }>
      <Alert
        severity={ severity }
        variant="filled"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={ () => {
              setOpen(false);
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
  alertOptions: PropTypes.shape({
    isOpen: PropTypes.bool.isRequired,
    severity: PropTypes.string,
    setOpen: PropTypes.func.isRequired,
  }),
  children: PropTypes.node,
};


export default AlertTogle;
