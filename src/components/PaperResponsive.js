import React from "react";
import PropTypes from "prop-types";
import { useMediaQuery } from "@mui/material";
import { Paper } from "@mui/material";

const sxMobile = {
  height:"calc(100vh)",
  paddingTop: "56px" 
};

const sxNoMobile = {
  height:"calc(100vh)",
  padding: "56px 0 0 240px" 
};

function PaperResponsive({children}) {
  const isScreenMobile = useMediaQuery("(max-width:600px)");

  return (
    <Paper sx={ isScreenMobile ? sxMobile : sxNoMobile }>
      {children}
    </Paper>
  );
}

PaperResponsive.propTypes = {
  children: PropTypes.node,
};

export default PaperResponsive;
