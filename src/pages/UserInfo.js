/* eslint-disable react/jsx-max-depth */
import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import PaperResponsive from "../components/PaperResponsive";

const sxContainer = {
  display: "flex", 
  flexFlow: "column", 
  alignItems: "center",
};

const sxBox = {
  display: "flex", 
  flexFlow: "column wrap",
  justifyContent: "space-evenly",
  alignItems: "center",
  border: "solid 1px gray",
  borderRadius: "5px",
  margin: "10px",
  padding: "10px 0",
  width: "95%"
}; 

const sxBoxForm = {
  display: "flex", 
  flexFlow: "column wrap",
  justifyContent: "space-evenly",
  alignItems: "flex-left",
  border: "solid 1px gray",
  borderRadius: "5px",
  margin: "10px",
  padding: "10px 10px",
  width: "95%"
};

const sxBtnsEdit = {
  display: "flex", 
  flexFlow: "row", width: "20%", 
  justifyContent: "space-around"
};

function UserInfo() {

  const handleChangeGeneric = ({target}) => {
    console.log(target.id);
  };

  return (
    <PaperResponsive sx={ sxContainer }>
      <Box sx={ sxBox }>
        <Box sx={ {paddingTop: "10px"} }>
          <Typography
            variant="h1"
            sx={ {fontSize: "26px"} }
          >
            Informações do usuário
          </Typography>
        </Box>
        <Box sx={ { display: "flex", justifyContent: "flex-end", width: "100%"} }>
          <Box 
            sx={ sxBtnsEdit }
          >
            <button type="button">editar</button>
            <button type="button">exluir</button>
          </Box>
        </Box>
        <Box sx={ sxBoxForm }>
          <TextField
            id="nome"
            disabled
            label="Nome"
            onChange={ handleChangeGeneric }
            variant="standard"
            value="Matheus Alves de Oliveira"
          />
          <TextField
            id="cargo"
            label="Cargo"
            value="Diretor"
            variant="standard"
          />
          <TextField
            id="contato"
            label="Contato"
            type="tel"
            variant="standard"
            value="119565424"
          />
          <TextField
            id="email"
            label="Email"
            type="email"
            variant="standard"
            value="email@gmail.com"
          />
          <TextField
            id="perfilAcesso"
            label="Perfil de acesso"
            variant="standard"
          />
          <TextField
            id="senha"
            label="Senha"
            type="password"
            variant="standard"
          />
          <TextField
            id="standard-helperText"
            label="Helper text"
            defaultValue="Default Value"
            helperText="Some important text"
            variant="standard"
          />
        </Box>
        <Box sx={ { display: "flex"} }>
          <Button variant="contained">Salvar</Button>
          <Button variant="contained">Cancelar</Button>
        </Box>
      </Box>
    </PaperResponsive>
  );
}

export default UserInfo;
