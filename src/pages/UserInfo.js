import { TextField } from "@mui/material";
import { validateData } from "../util/formValidate";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getUserById } from "../mockRequests/mockAPI";
import EditUnicEntity from "../components/EditUnicEntity";

const initialStateUser = {
  nome: "",
  cargo: "",
  contato: "",
  email: "",
  perfilAcesso: "",
  senha: ""
};

const initialStateValidation = {
  nome: true,
  cargo: true,
  contato: true,
  email: true,
  perfilAcesso: true,
  senha: true
};

function UserInfo() {
  const [userInfo, setUserInfo] = useState(initialStateUser);
  const [validation, setValidation] = useState(initialStateValidation);
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

  const handleClickSave = () => {
    console.log("salvar usuario no local storage");
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
        inputProps={ {maxlength: "11"} }
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

export default UserInfo;
