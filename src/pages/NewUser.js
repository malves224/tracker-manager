/* eslint-disable no-unused-vars */
/* eslint-disable max-lines */
import { Box, Typography, 
  TextField, Button, Select, MenuItem, InputLabel, FormHelperText} from "@mui/material";
import React, { useState, useEffect} from "react";
import { validateData } from "../util/formValidate";
import PaperResponsive from "../components/PaperResponsive";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { checkPermission, getPerfilList } from "../mockRequests/mockAPI";
import { AlertTogle } from "../components";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { throwAlert } from "../actions";


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
  },
  email: {
    isValid: true,
  },
  contato: {
    isValid: true,
  },
  perfilAcesso: {
    isValid: true,
  },
  senha: {
    isValid: true,
  },
};

const initialStateAlert = {
  value: "", severity:"warning", open: false
};

function NewUser({perfilId, setAlert}) {
  const [newUserData, setNewUserData ] = useState(initialStateNewUser);
  const [validate, setValidate] = useState(initialStateValidate);
  const history = useHistory();
  const [idPerfil, setIdPerfil] = useState(0);
  const [messageAlert, setMessageAlert] = useState(initialStateAlert);
  const [allPerfilAcesso, setAllPerfilAcess] = useState([]);
  const [,pageCurrent] = location.pathname.split("/");

  const toogleAlert = (valueBool) => setAlert({...messageAlert, open:valueBool});
  
  useEffect(() => {
    getPerfilList().then((response) => setAllPerfilAcess(response));
    return () => {
      setAllPerfilAcess([]);
    };
  }, []);

  const handleChangeGeneric = ({target}) => {
    const { name, value } = target;
    setNewUserData({
      ...newUserData,
      [name]: value,
    });
  };

  const handleBlurGeneric = ({target}, message = undefined) => {
    const { name, value } = target;
    setValidate({
      ...validate,
      [name]: {
        ...validateData.checkWithMessage(name, value, message),
      }
    });
  };

  const handleClickItemSelect = (id) => {
    setIdPerfil(id);
    setValidate({
      ...validate,
      perfilAcesso: {
        isValid: true,
        message: "",
      }
    });
  };

  const thrownAlertNoPermission = () => setAlert({
    value: "Você não tem permissão para essa ação.",
    severity: "error",
    open: true,        
  });

  const handleClickButton = () => {
    // 1 verifica se o campo perfil esta prenchido
    setValidate({
      ...validate,
      perfilAcesso: {
        ...validateData
          .checkWithMessage("perfilAcesso", 
            newUserData.perfilAcesso, "Campo obrigatório.")
      }
    });
    // 2 verifica se todos campos estão validos
    const allInputsIsValid = validateData.checkAllInputs({
      nome: validate.nome.isValid,
      email: validate.email.isValid,
      contato: validate.contato.isValid,
      perfilAcesso: validate.perfilAcesso.isValid,
      senha: validate.senha.isValid,
    });
    if (!allInputsIsValid) {
      setAlert({
        value: "Por favor verifique os campos em vermelho",
        severity: "error",
        open: true,
      });    
    } else {
      checkPermission(perfilId, pageCurrent, "create") // provavelmente essa verificação sera feito no back
        .then(() => {
          // efetivar alteração await funcaoQueAltera('novo dados');
          setAlert({
            value: "Usuario criado com sucesso",
            severity: "success",
            open: true,
          });
          setNewUserData(initialStateNewUser);
        })
        .catch(() => thrownAlertNoPermission());
    }
  };
  
  return (
    <PaperResponsive
      sx={ { display: "flex", 
        justifyContent: "center"} }
    >
      <AlertTogle
        severity={ messageAlert.severity }
        switchValue={ [messageAlert.open, toogleAlert] }
      >
        {messageAlert.value}
      </AlertTogle>
      <Box sx={ containerSx }>
        <AccountCircleIcon sx={ {fontSize: "60px"} } />
        <Typography sx={ { fontSize: "28px" } }variant="h1">
          Cadastro de usuário
        </Typography>
        <Box
          sx={ containerForms }
        >
          <TextField
            error={ !validate.nome.isValid }
            helperText={ !validate.nome.isValid && validate.nome.message }
            onChange={ handleChangeGeneric }
            onBlur={ handleBlurGeneric }
            value={ newUserData.nome }
            name="nome"
            label="Nome *"
            variant="standard"
            size="small"
          />
          <TextField
            error={ !validate.email.isValid }
            helperText={ !validate.email.isValid && validate.email.message }
            onBlur={ handleBlurGeneric }
            onChange={ handleChangeGeneric }
            value={ newUserData.email }
            name="email"
            variant="standard"
            label="Email *"
            size="small"
          />
          <TextField
            error={ !validate.contato.isValid }
            helperText={ !validate.contato.isValid && validate.contato.message }
            onBlur={ handleBlurGeneric }          
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
            error={ !validate.perfilAcesso.isValid }
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
                  onClick={ () => handleClickItemSelect(id) }
                  key={ id }
                  value={ name }
                >{name}
                </MenuItem>))}
          </Select>
          <TextField
            error={ !validate.senha.isValid }
            helperText={ !validate.senha.isValid && validate.senha.message }
            onBlur={ 
              (ev) => handleBlurGeneric(ev, "Insira uma senha com pelo menos 8 digitos.") 
            }                    
            onChange={ handleChangeGeneric }
            value={ newUserData.senha }
            name="senha"
            label="Senha *"
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

const mapStateToProps = (state) => ({
  perfilId: state.user.idPerfil,
});

const mapDispatchToProps = (dispatch) => ({
  setAlert: (payload) => dispatch(throwAlert(payload)),
});

NewUser.propTypes = {
  perfilId: PropTypes.number.isRequired,
  permissionsToCurrentPage: PropTypes.shape({
    page: PropTypes.string,
    editing: PropTypes.bool,
    delete: PropTypes.bool,
  }),
  setAlert: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewUser);
