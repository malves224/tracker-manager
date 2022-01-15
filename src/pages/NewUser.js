/* eslint-disable react/jsx-max-depth */
/* eslint-disable no-unused-vars */
import { Box, Typography, 
  TextField, Button, Select, MenuItem, InputLabel, FormControl} from "@mui/material";
import React, { useState, useEffect} from "react";
import PaperResponsive from "../components/PaperResponsive";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { getPerfilList } from "../mockRequests/mockAPI";

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
  width: 0.4,
  height: "450px",
  justifyContent: "space-around"
};

const initialStateNewUser = {
  nome: "",
  email: "",
  contato: "",
  perfilAcesso: "",
  senha: "",
};

const initialStateValidate = {
  nome: {
    isValid: true,
    message: ""
  },
  email: {
    isValid: true,
    message: ""
  },
  contato: {
    isValid: true,
    message: ""
  },
  perfilAcesso: {
    isValid: true,
    message: ""
  },
  senha: {
    isValid: true,
    message: ""
  },
};


function NewUser() {
  const [newUserData, setNewUserData ] = useState(initialStateNewUser);
  const [validateData, setValidateData] = useState(initialStateValidate);
  const [idPerfil, setIdPerfil] = useState(0);
  const [allPerfilAcesso, setAllPerfilAcess] = useState([]);
  
  useEffect(() => {
    getPerfilList().then((response) => setAllPerfilAcess(response));
    return () => {
      setAllPerfilAcess([]);
    };
  }, []);

  const handleChangeGeneric = ({target}) => {
    const { name, value } = target;
    setValidateData({
      ...newUserData,
      [name]: value,
    });
  };

  const handleBlurGeneric = ({target}) => {
    const { name, value } = target;
    setValidateData({
      ...validateData,
      [name]: {
        ...[name],
        value: validateData.check(name, value),
      }
    });
  };

  const handleClickButton = () => {
    // 1 verifica se todos inputs estão validos, se nao retornar menssagem

  };
  
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
          <TextField
            error={ !validateData.nome.isValid }
            helperText={ !validateData.nome.message }
            onChange={ handleChangeGeneric }
            onBlur={ handleBlurGeneric }
            value={ newUserData.nome }
            name="nome"
            label="Nome"
            variant="standard"
            size="small"
          />
          <TextField
            onChange={ handleChangeGeneric }
            value={ newUserData.email }
            name="email"
            variant="standard"
            label="Email"
            size="small"
          />
          <TextField
            onChange={ handleChangeGeneric }
            value={ newUserData.contato }
            name="contato"
            inputProps={ {maxLength: "11"} }
            label="Telefone celular"
            variant="standard"
            size="small"
          />
          <InputLabel id="perfil-label">Perfil de acesso:</InputLabel>
          <Select
            onChange={ handleChangeGeneric }
            labelId="perfil-label"
            name="perfilAcesso"
            label="Perfil de acesso"
            value={ newUserData.perfilAcesso }
            variant="standard"
            size="small"
          >
            <MenuItem
              value=""
              onClick={ () => setIdPerfil(0) }
            />
            {allPerfilAcesso
              .map(({id, name}) => (
                <MenuItem
                  onClick={ () => setIdPerfil(id) }
                  key={ id }
                  value={ name }
                >{name}
                </MenuItem>))}
          </Select>
          <TextField
            onChange={ handleChangeGeneric }
            value={ newUserData.senha }
            name="senha"
            label="Senha"
            type="password"
            variant="standard"
            size="small"
          />
        </Box>
        <Button
          onClick={ handleClickButton }
          color="success"
          variant="contained"
        >
          Cadastrar
        </Button>
      </Box>
    </PaperResponsive>
  );
}

export default NewUser;
