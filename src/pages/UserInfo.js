import { TextField } from "@mui/material";
import { validateData } from "../util/formValidate";
import React, { useEffect, useState } from "react";
import { AlertTogle } from "../components";
import { useLocation } from "react-router-dom";
import { checkPermission, getUserById } from "../mockRequests/mockAPI";
import EditUnicEntity from "../components/EditUnicEntity";
import { connect } from "react-redux";
import PropTypes from "prop-types";


const initialStateUser = {
  nome: "",
  cargo: "",
  contato: "",
  email: "",
  perfilAcesso: "",
  senha: ""
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

function UserInfo({perfilId}) {
  const [userInfo, setUserInfo] = useState(initialStateUser);
  const [validation, setValidation] = useState(initialStateValidation);
  const [isEditing, setEditing] = useState(false);
  const [messageAlert, setMessageAlert] = useState(initialStateAlert);
  const location = useLocation();
  const [,pageCurrent,idUser] = location.pathname.split("/");

  const toogleAlert = (valueBool) => setMessageAlert({...messageAlert, open:valueBool});

  const requestUser = async () => {
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

  const handleBlurGeneric = ({target}) => {
    const { id: name, value } = target;
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
    console.log("excluir usuario, mudando staatus no banco");
  };

  const handleClickSave = async () => {
    // ordem de verificações
    // 1 verificar os campos de imput 
    // 2 verificar se tem permisão para tal ação no banck-end
    try {
      await checkPermission(perfilId, pageCurrent, "editing");// mudar para uma função que altere o dado no db
      const isAllInputValid = validateData.checkAllInputs(validation);
      isAllInputValid 
        ? setMessageAlert({
          value: "Usuario alterado com sucesso",
          severity: "success",
          open: true,
        })
        : setMessageAlert({
          value: "Por favor verifique os campos em vermelho",
          severity: "error",
          open: true,
        });
    } catch (error) {
      const messageError = error.message;
      console.log(messageError);
    }
  };

  return (
    <EditUnicEntity
      tittle="Informações do usuario"
      setEditing={ handleClickEdit }
      isEditing={ isEditing }
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
        id="email"
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
});

UserInfo.propTypes = {
  perfilId: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(UserInfo);
