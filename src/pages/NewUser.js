import { Box, Typography, TextField, Button } from "@mui/material";
import React from "react";
import PaperResponsive from "../components/PaperResponsive";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const containerSx = {
  display: "flex",
  flexFlow: "column",
  alignItems: "center",
  border: "solid 1px gray",
  borderRadius: "5px",
  height: "640px",
  marginTop: "50px",
  justifyContent: "space-around",
  width: 0.8
};

const containerForms = {

  display: "flex", 
  flexFlow: "column",
  width: 0.6,
  height: "450px",
  justifyContent: "space-around"
};

function NewUser() {
  return (
    <PaperResponsive
      sx={ { display: "flex", 
        justifyContent: "center"} }
    >
      <Box sx={ containerSx }>
        <AccountCircleIcon sx={ {fontSize: "60px"} } />
        <Typography sx={ { fontSize: "28px" } }variant="h1">
          Cadastro de usuário
        </Typography>
        <Box
          sx={ containerForms }
        >
          <TextField />
          <TextField />
          <TextField />
          <TextField />
          <TextField />
          <TextField />
        </Box>
        <Button variant="contained">
          Cadastrar
        </Button>
      </Box>
    </PaperResponsive>
  );
}

export default NewUser;
