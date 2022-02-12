import { Box, Button, InputLabel, 
  MenuItem, Select, TextField } from "@mui/material";
import { getPerfilList, createUser } from "../../mockRequests/mockAPI"; // MOCK REQUEST
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { validateData } from "../../util/formValidate";
import { connect } from "react-redux";
import { throwAlert } from "../../actions";


const containerForms = {
  display: "flex", 
  flexFlow: "column",
  width: 0.4,
  height: "450px",
  justifyContent: "space-around"
};


const initialStateNewUser = {
  nome: undefined,
  cargo: undefined,
  email: undefined,
  contato: undefined,
  perfilAcesso: undefined,
  senha: undefined,
};

const initialStateDataIsValid = {
  nome: false,
  cargo: false,
  email: false,
  contato: false,
  perfilAcesso: false,
  senha: false,
};


function FormNewUser({setAlert}) {
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

  const thrownAlert = (message, severity = "warning") => setAlert({
    value: message,
    severity,
    open: true,
  });

  const updatePerfilList = async () => {
    try {
      const perfilList = await getPerfilList();
      setAllPerfilAcess(perfilList);
    } catch (error) {
      thrownAlert("Error ao buscar perfis do servidor");
    }
  };

  useEffect(() => {
    updatePerfilList();
    return () => {
      setAllPerfilAcess([]);
    };
  }, []);

  const handleClickItemSelect = (id) => {
    setIdPerfil(id);
  };

  const clearAllInputs = () => {
    setNewUserData({
      nome: "",
      cargo: "",
      email: "",
      contato: "",
      perfilAcesso: "",
      senha: ""
    }); 
    setIdPerfil(0);
  };

  const handleClickButton = async () => {  
    const userForCreate = {...newUserData, idPerfil};
    createUser(userForCreate)
      .then((res) => {
        clearAllInputs();
        thrownAlert(res.message, "success");
      })
      .catch((err) => thrownAlert(err.message, "error"));
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
        error={ verifyValidationData("cargo") }
        helperText={ verifyValidationData("cargo") 
          && "Insira o cargo ex: aux. administrativo" }
        onChange={ handleChangeGeneric }
        value={ newUserData.cargo }
        name="cargo"
        label="Cargo *"
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
              value={ name }
              onClick={ () => handleClickItemSelect(id) }
              key={ id }
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

const mapDispatchToProps = (dispatch) => ({
  setAlert: (payload) => dispatch(throwAlert(payload)),
});

FormNewUser.propTypes = {
  setAlert: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(FormNewUser);
