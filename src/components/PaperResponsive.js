import React from "react";
import PropTypes from "prop-types";
import { useMediaQuery } from "@mui/material";
import { Paper } from "@mui/material";

const sxMobile = {
  minHeight: "100vh",
  paddingTop: "60px" 
};

const sxNoMobile = {
  minHeight:"calc(100vh)",
  padding: "60px 0 0 240px" 
};

function PaperResponsive({children, sx}) {
  const isScreenMobile = useMediaQuery("(max-width:600px)");

  return (
    <Paper sx={ isScreenMobile ? { ...sxMobile, ...sx} : { ...sxNoMobile, ...sx} }>
      {children}
    </Paper>
  );
}

PaperResponsive.defaultProps = {
  sx: {},
};

PaperResponsive.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.objectOf(PropTypes.string)
};

export default PaperResponsive;
