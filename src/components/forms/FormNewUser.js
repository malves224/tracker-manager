/* eslint-disable no-unused-vars */
import { Box, Button, InputLabel, 
  MenuItem, Select, TextField } from "@mui/material";
import { getPerfilList } from "../../mockRequests/mockAPI"; // MOCK REQUEST
import React, { useEffect, useState } from "react";
import { validateData } from "../../util/formValidate";

const containerForms = {
  display: "flex", 
  flexFlow: "column",
  width: 0.4,
  height: "450px",
  justifyContent: "space-around"
};


const initialStateNewUser = {
  nome: undefined,
  email: undefined,
  contato: undefined,
  perfilAcesso: undefined,
  senha: undefined,
};

const initialStateDataIsValid = {
  nome: false,
  email: false,
  contato: false,
  perfilAcesso: false,
  senha: false,
};


function FormNewUser() {
  // eslint-disable-next-line no-unused-vars
  const [userDataIsValid, setDataIsValid ] = useState(initialStateDataIsValid);
  const [newUserData, setNewUserData ] = useState(initialStateNewUser);
  const [allPerfilAcesso, setAllPerfilAcess] = useState([]);
  const [idPerfil, setIdPerfil] = useState(0);

  const handleChangeGeneric = ({target}) => {
    const { name, value } = target;
    setNewUserData({
      ...newUserData,
      [name]: value,
    });
    const valueIsValid = validateData.check(name, value);
    setDataIsValid({
      ...userDataIsValid,
      [name]: valueIsValid,
    });
  };

  useEffect(() => {
    getPerfilList().then((response) => setAllPerfilAcess(response));
    return () => {
      setAllPerfilAcess([]);
    };
  }, []);

  const handleClickItemSelect = (id) => {
    setIdPerfil(id);
  };

  const handleClickButton = () => {
    // enviar info para o servidor com os dados validado
    console.log(newUserData);
  }; 

  const handleOnBlurSenha = () => {
    newUserData.perfilAcesso === undefined 
      && setNewUserData({
        ...newUserData,
        perfilAcesso: ""
      });
  };

  const verifyValidationData = (type) => 
    newUserData[type] === undefined ? false : !userDataIsValid[type];

  return (
    <Box
      sx={ containerForms }
    >
      <TextField
        error={ verifyValidationData("nome") }
        helperText={ verifyValidationData("nome") && "Insira o nome completo" }
        onChange={ handleChangeGeneric }
        value={ newUserData.nome }
        name="nome"
        label="Nome completo *"
        variant="standard"
        size="small"
      />
      <TextField
        error={ verifyValidationData("email") }
        helperText={ 
          verifyValidationData("email") && "Insira um email valido ex: lucas@gmail.com" 
        }
        onChange={ handleChangeGeneric }
        value={ newUserData.email }
        name="email"
        variant="standard"
        label="Email *"
        size="small"
      />
      <TextField
        error={ verifyValidationData("contato") }
        helperText={ 
          verifyValidationData("contato") && "Insira um contato valido ex: 11921497099" 
        }
        onChange={ handleChangeGeneric }
        value={ newUserData.contato }
        name="contato"
        inputProps={ {maxLength: "11"} }
        label="Telefone celular *"
        variant="standard"
        size="small"
      />
      <InputLabel
        id="perfil-label"
      >Perfil de acesso: *
      </InputLabel>
      <Select
        error={ verifyValidationData("perfilAcesso") }
        labelId="perfil-label"
        onChange={ handleChangeGeneric }
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
              onClick={ () => handleClickItemSelect(id) }
              key={ id }
              value={ name }
            >{name}
            </MenuItem>))}
      </Select>
      {
        verifyValidationData("perfilAcesso") &&
          <span style={ {color: "#d32f2f", fontSize:"14px"} }>
            Insira um perfil de acesso
          </span>
      }
      <TextField
        error={ verifyValidationData("senha") }
        helperText={ verifyValidationData("senha") 
          && "Insira uma senha com ao menos 8 digitos" }
        onChange={ handleChangeGeneric }
        onBlur={ handleOnBlurSenha }
        value={ newUserData.senha }
        name="senha"
        label="Senha *"
        type="password"
        variant="standard"
        size="small"
      />
      <Button
        disabled={ !validateData.checkAllInputs(userDataIsValid) }
        onClick={ handleClickButton }
        color="success"
        variant="contained"
      >
        Cadastrar
      </Button>

    </Box>
  )
  ;
}

export default FormNewUser;
