import {  InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { validateData } from "../util/formValidate";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { checkPermissionAction, getUserById, 
  getPerfilList, editUserById, deleteUser } from "../mockRequests/mockAPI";
import EditUnicEntity from "../components/EditUnicEntity";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { throwAlert } from "../actions";
// é preciso simular a função que checa a permisão de ação do usuario para determinado entidade

const initialStateUser = {
  nome: "",
  cargo: "",
  contato: "",
  email: "",
  perfilAcesso: "",
  senha: "",
};

const initialStateValidation = {
  nome: true,
  cargo: true,
  contato: true,
  email: true,
  perfilAcesso: true,
  senha: true
};

function UserInfo({setAlert}) {
  const [userInfo, setUserInfo] = useState(initialStateUser);
  const [idPerfil, setIdPerfil] = useState(0);
  const [validation, setValidation] = useState(initialStateValidation);
  const [isEditing, setEditing] = useState(false);
  const [allPerfilAcess, setAllPerfilAcess ] = useState([]);
  const location = useLocation();
  const [,pageCurrent,idUser] = location.pathname.split("/");
  const history = useHistory();


  const requestUser = async () => {
    const response = await getUserById(idUser); // essa função traz os dados do localStorage
    setUserInfo(response);
    setIdPerfil(response.idPerfil);
  };

  const thrownAlertNoPermission = () => setAlert({
    value: "Você não tem permissão para essa ação.",
    severity: "error",
    open: true,        
  });

  useEffect(() => {
    requestUser();
    getPerfilList().then((response) => setAllPerfilAcess(response));
    return () => {
      setUserInfo(initialStateUser);
      setAllPerfilAcess([]);
      setIdPerfil(0);
    };
  }, []);

  const handleChangeGeneric = ({target}) => {
    const { name, value } = target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
    const valueIsValid = validateData.check(name, value);
    setValidation({
      ...validation,
      [name]: valueIsValid,
    });
  };

  const handleClickCancel = () => {
    setEditing(false);
    requestUser();
    setValidation(initialStateValidation);
  };

  const handleClickEdit = () => {
    setEditing(!isEditing);
  };

  const handleClickExcluir = async () => {
    const hasPermission = await checkPermissionAction(
      perfilIdUserLogado, pageCurrent, "delete"); // provavelmente essa verificação sera feito no back
    if (hasPermission) {
      const response = await deleteUser(idUser);
      setAlert({ value: response.message, severity: "success", open: true});
      history.push("/UsersControl");
    } else {
      thrownAlertNoPermission();
    }  
  };

  const handleClickSave = async () => {
    const isAllInputValid = validateData.checkAllInputs(validation); // 1 verificar os campos de imput 
    if (!isAllInputValid) {
      setAlert({value: "Por favor verifique os campos em vermelho", severity: "error", 
        open: true});    
    } else {
      const hasPermission = await 
      checkPermissionAction(perfilIdUserLogado, pageCurrent, "editing");
      if (hasPermission) {
        try {
          await editUserById(idUser, {...userInfo, idPerfil: idPerfil});
          setAlert({value: "Usuario alterado com sucesso", severity: "success",
            open: true,
          });
          setEditing(false);
        } catch (error) {
          setAlert({
            value: error.message,
            severity: "error",
            open: true,
          });
        }
      } else {
        thrownAlertNoPermission();
      }
    }
  };

  const verifyValidationData = (type) => 
    validation[type] === undefined ? false : !validation[type];

 
  return (
    <EditUnicEntity
      tittle="Informações do usuario"
      setEditing={ handleClickEdit }
      isEditing={ isEditing }
      permisionActionInUnity={ () => ({ edit: true, exclude: true, create: true}) } // SIMULAR FUNÇÃO DE REQEST
      handleClickSave={ handleClickSave }
      handleClickExcluir={ handleClickExcluir }
      handleClickCancel={ handleClickCancel }
    >
      <TextField
        error={ verifyValidationData("nome") }
        helperText={ verifyValidationData("nome") && "insira o nome completo" }
        name="nome"
        disabled={ !isEditing }
        label="Nome"
        onChange={ handleChangeGeneric }
        variant="standard"
        value={ userInfo.nome }
      />
      <TextField
        name="cargo"
        error={ verifyValidationData("cargo") }
        disabled={ !isEditing }
        label="Cargo"
        onChange={ handleChangeGeneric }
        value={ userInfo.cargo }
        variant="standard"
      />
      <TextField
        name="contato"
        error={ verifyValidationData("contato") }
        inputProps={ {maxLength: "11"} }
        helperText={ 
          verifyValidationData("contato") && "Contato Invalido, Confira o contato" 
        }
        disabled={ !isEditing }
        label="Contato"
        onChange={ handleChangeGeneric }
        type="tel"
        variant="standard"
        value={ userInfo.contato }
      />
      <TextField
        name="email"
        error={ verifyValidationData("email") }
        helperText={ verifyValidationData("email") && "Email Invalido." }
        disabled={ !isEditing }
        label="Email"
        onChange={ handleChangeGeneric }
        type="email"
        variant="standard"
        value={ userInfo.email }
      />
      <InputLabel id="perfil-label">
        Perfil de acesso
      </InputLabel>
      <Select
        disabled={ !isEditing }
        labelId="perfil-label"
        onChange={ handleChangeGeneric }
        label="Perfil de acesso"
        value={ userInfo.perfilAcesso }
        variant="standard"
        name="perfilAcesso"
      >
        {allPerfilAcess
          .map(({id, name}) => (
            <MenuItem
              onClick={ () => setIdPerfil(id) }
              key={ id }
              value={ name }
            >{name}
            </MenuItem>))}
      </Select>
      <TextField
        disabled={ !isEditing }
        error={ verifyValidationData("senha") }
        helperText={ verifyValidationData("senha") && "Insira ao menos 8 digitos" }
        name="senha"
        label="Senha"
        onChange={ handleChangeGeneric }
        type="password"
        variant="standard"
        value={ userInfo.senha }
      />
    </EditUnicEntity>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setAlert: (payload) => dispatch(throwAlert(payload)),
});

UserInfo.propTypes = {
  setAlert: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(UserInfo);
