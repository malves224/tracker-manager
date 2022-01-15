import {  MenuItem, Select, TextField } from "@mui/material";
import { validateData } from "../util/formValidate";
import React, { useEffect, useState } from "react";
import { AlertTogle } from "../components";
import { useLocation } from "react-router-dom";
import { checkPermission, getUserById, getPerfilList } from "../mockRequests/mockAPI";
import EditUnicEntity from "../components/EditUnicEntity";
import { connect } from "react-redux";
import PropTypes from "prop-types";


const initialStateUser = {
  nome: "",
  cargo: "",
  contato: "",
  email: "",
  perfilAcesso: "",
  senha: "",
};

const initialStateValidation = {
  contato: true,
  email: true,
  perfilAcesso: true,
  senha: true
};

const initialStateAlert = {
  value: "", severity:"warning", open: false
};

function UserInfo({perfilId, permissionsToCurrentPage}) {
  const [userInfo, setUserInfo] = useState(initialStateUser);
  const [validation, setValidation] = useState(initialStateValidation);
  const [isEditing, setEditing] = useState(false);
  const [allPerfilAcess, setAllPerfilAcess ] = useState([]);
  const [messageAlert, setMessageAlert] = useState(initialStateAlert);
  const location = useLocation();
  const [,pageCurrent,idUser] = location.pathname.split("/");

  const toogleAlert = (valueBool) => setMessageAlert({...messageAlert, open:valueBool});

  const requestUser = async () => {
    const response = await getUserById(parseInt(idUser));
    setUserInfo({
      ...initialStateUser,
      ...response[0],
    });
    // trazer tbm do localStorage futuramente
  };

  const thrownAlertNoPermission = () => setMessageAlert({
    value: "Você não tem permissão para essa ação.",
    severity: "error",
    open: true,        
  });

  useEffect(() => {
    requestUser();
    getPerfilList().then((response) => setAllPerfilAcess(response));
    // RESGATAR DADOS DO LOCALSTORAGE PARA TESTES
    return () => {
      setUserInfo(initialStateUser);
    };
  }, []);

  const handleChangeGeneric = ({target}) => {
    const { name, value } = target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleBlurGeneric = ({target}) => {
    const { name, value } = target;
    setValidation({
      ...validation,
      [name]: validateData.check(name, value)
    });
  };

  const handleClickCancel = () => {
    setEditing(false);
    requestUser();
    setValidation(initialStateValidation);
  };

  const handleClickEdit = () => {
    setEditing(true);
  };

  const handleClickExcluir = () => {
    checkPermission(perfilId, pageCurrent, "delete")
      .then(() => {
        // efetivar alteração await funcaoQueAltera('novo dados');
        setMessageAlert({
          value: "Usuario excluido com sucesso",
          severity: "success",
          open: true,
        });      
      })
      .catch(() => thrownAlertNoPermission());
  };

  const handleClickSave = () => {
    const isAllInputValid = validateData.checkAllInputs(validation); // 1 verificar os campos de imput 
    if (!isAllInputValid) {
      setMessageAlert({
        value: "Por favor verifique os campos em vermelho",
        severity: "error",
        open: true,
      });    
    } else {
      checkPermission(perfilId, pageCurrent, "editing")
        .then(() => {
          // efetivar alteração await funcaoQueAltera('novo dados');
          setMessageAlert({
            value: "Usuario alterado com sucesso",
            severity: "success",
            open: true,
          });
        })
        .catch(() => thrownAlertNoPermission());
    }
  }; 
 
  return (
    <EditUnicEntity
      tittle="Informações do usuario"
      setEditing={ handleClickEdit }
      isEditing={ isEditing }
      permissionForEdit={ permissionsToCurrentPage.editing }
      permissionForDelete={ permissionsToCurrentPage.delete }
      handleClickSave={ handleClickSave }
      handleClickExcluir={ handleClickExcluir }
      handleClickCancel={ handleClickCancel }
    >
      <AlertTogle
        severity={ messageAlert.severity }
        switchValue={ [messageAlert.open, toogleAlert] }
      >
        {messageAlert.value}
      </AlertTogle>
      <TextField
        name="nome"
        disabled={ !isEditing }
        label="Nome"
        onChange={ handleChangeGeneric }
        variant="standard"
        value={ userInfo.nome }
      />
      <TextField
        name="cargo"
        disabled={ !isEditing }
        label="Cargo"
        onChange={ handleChangeGeneric }
        value={ userInfo.cargo }
        variant="standard"
      />
      <TextField
        name="contato"
        error={ !validation.contato }
        inputProps={ {maxLength: "11"} }
        helperText={ !validation.contato && "Contato Invalido, Confira o contato" }
        onBlur={ handleBlurGeneric }
        disabled={ !isEditing }
        label="Contato"
        onChange={ handleChangeGeneric }
        type="tel"
        variant="standard"
        value={ userInfo.contato }
      />
      <TextField
        name="email"
        error={ !validation.email }
        helperText={ !validation.email && "Email Invalido." }
        onBlur={ handleBlurGeneric }
        disabled={ !isEditing }
        label="Email"
        onChange={ handleChangeGeneric }
        type="email"
        variant="standard"
        value={ userInfo.email }
      />
      <Select
        disabled={ !isEditing }
        onChange={ handleChangeGeneric }
        label="Perfil de acesso"
        value={ userInfo.perfilAcesso }
        variant="standard"
        name="perfilAcesso"
      >
        {allPerfilAcess
          .map(({id, name}) => (
            <MenuItem 
              key={ id }
              value={ name }
            >{name}
            </MenuItem>))}
      </Select>
      <TextField
        disabled={ !isEditing }
        name="senha"
        label="Senha"
        error={ !validation.senha }
        helperText={ !validation.senha && "Insira ao menos 8 digitos" }
        onBlur={ handleBlurGeneric }
        onChange={ handleChangeGeneric }
        type="password"
        variant="standard"
        value={ userInfo.senha }
      />
    </EditUnicEntity>
  );
}

const mapStateToProps = (state) => ({
  perfilId: state.user.idPerfil,
  permissionsToCurrentPage: state.user.perfilData.permissions
    .find(({page}) => page === "UserInfo")
});

UserInfo.propTypes = {
  perfilId: PropTypes.number.isRequired,
  permissionsToCurrentPage: PropTypes.shape({
    page: PropTypes.string,
    editing: PropTypes.bool,
    delete: PropTypes.bool,
  }),
};

export default connect(mapStateToProps)(UserInfo);
