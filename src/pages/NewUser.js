import { Box, Typography } from "@mui/material";
import React from "react";
import PaperResponsive from "../components/PaperResponsive";
import FormNewUser from "../components/forms/FormNewUser";
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
        <FormNewUser />
      </Box>
    </PaperResponsive>
  );
}

export default NewUser;
