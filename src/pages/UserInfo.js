import { TextField } from "@mui/material";
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

function UserInfo() {
  const [userInfo, setUserInfo] = useState(initialStateUser);
  const [userInfoEdit, setUserInfoEdit] = useState();
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

  const handleClickExcluir = () => {
    console.log("excluir usuario, mudando staatus no banco");
  };

  const handleClickSave = () => {
    console.log("salvar usuario no local storage");
  };

  return (
    <EditUnicEntity
      tittle="Informações do usuario"
      setEditing={ setEditing }
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
    </EditUnicEntity>
  );
}

export default UserInfo;
