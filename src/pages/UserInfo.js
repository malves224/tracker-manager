/* eslint-disable no-unused-vars */
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { getUserById } from "../mockRequests/mockAPI";
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
  width: "90%"
};

const sxBtnsEdit = {
  display: "flex", 
  flexFlow: "row", width: "250px",
  alignItems: "center",
  justifyContent: "space-around"
};

const initialStateUser = {
  nome: "",
  cargo: "",
  contato: "",
  email: "",
  perfilAcesso: "",
  senha: ""
};

function UserInfo() {
  const [userInfo, setUserInfo] = useState(initialStateUser);
  const [isEditing, setEditing] = useState(false);
  const location = useLocation();


  const requestUser = async () => {
    const { pathname } = location;
    const [,,idUser] = pathname.split("/");
    const response = await getUserById(idUser);
    setUserInfo({
      ...initialStateUser,
      ...response[0],
    });
    // trazer tbm do localStorage futuramente
  };

  useEffect(() => {
    requestUser();
    return () => {
      setUserInfo(initialStateUser);
    };
  }, []);

  const handleChangeGeneric = ({target}) => {
    const { id: name, value } = target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleClickCancel = () => {
    setEditing(false);
    requestUser();
  };

  const handleClickSave = () => {
    console.log("salvar usuario no local storage");
  };

  return (
    <PaperResponsive sx={ sxContainer }>
      <Box sx={ sxBox }>
        <Box sx={ { display: "flex", justifyContent: "flex-end", width: "100%"} }>
          <Box sx={ {padding: "5px 0"} }>
            <Typography
              variant="h1"
              sx={ {fontSize: "26px", marginLeft: "10px"} }
            >
              Informações do usuário
            </Typography>
          </Box>

          <Box 
            sx={ sxBtnsEdit }
          >
            <Button
              onClick={ () => setEditing(true) }
              color="primary"
              size="small"
              variant="contained"
              startIcon={ <EditIcon /> }
            >editar
            </Button>
            <Button
              color="error"
              size="small"
              variant="contained"
              startIcon={ <DeleteIcon /> }
            >excluir
            </Button>
          </Box>
        </Box>
        <Box sx={ sxBoxForm }>
          <TextField
            id="nome"
            disabled={ !isEditing }
            label="Nome"
            onChange={ handleChangeGeneric }
            variant="standard"
            value={ userInfo.nome }
          />
          <TextField
            id="cargo"
            disabled={ !isEditing }
            label="Cargo"
            onChange={ handleChangeGeneric }
            value={ userInfo.cargo }
            variant="standard"
          />
          <TextField
            id="contato"
            disabled={ !isEditing }
            label="Contato"
            onChange={ handleChangeGeneric }
            type="tel"
            variant="standard"
            value={ userInfo.contato }
          />
          <TextField
            id="email"
            disabled={ !isEditing }
            label="Email"
            onChange={ handleChangeGeneric }
            type="email"
            variant="standard"
            value={ userInfo.email }
          />
          <TextField
            disabled={ !isEditing }
            id="perfilAcesso"
            label="Perfil de acesso"
            onChange={ handleChangeGeneric }
            variant="standard"
            value={ userInfo.perfilAcesso }
          />
          <TextField
            disabled={ !isEditing }
            id="senha"
            label="Senha"
            onChange={ handleChangeGeneric }
            type="password"
            variant="standard"
            value={ userInfo.senha }
          />
        </Box>
        <Box sx={ { display: "flex", width: "80%", justifyContent: "space-around"} }>
          <Button
            onClick={ handleClickSave }
            disabled={ !isEditing }
            variant="contained"
          >Salvar
          </Button>
          <Button
            onClick={ handleClickCancel }
            disabled={ !isEditing }
            variant="contained"
          >Cancelar
          </Button>
        </Box>
      </Box>
    </PaperResponsive>
  );
}

export default UserInfo;
