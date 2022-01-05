/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, {useEffect, useState} from "react";
import DataGridCustom from "../components/DataGridCustom";
import { getUsersList } from "../mockRequests/mockAPI";

function UsersList() {

  const [columns] = useState([
    { field: "login", headerName: "Login", width: 150 },
    { field: "nome", headerName: "Nome", width: 150 },
    { field: "perfil de acesso", headerName: "Perfil de acesso", width: 150 },
  ]);

  const [rowsData1, setRowsData ] = useState([]);

  const requestUser = async () => {
    const response = await getUsersList();
  };


  const rowsData = [
    // eslint-disable-next-line sonarjs/no-duplicate-string
    { id: "1", Login: "1@gmsail.com", Nome: "Matheus", "Perfil de acesso": "Admin", "Ações": "editar excluir" },
    { id: "2", Login: "a1@gmail.com", Nome: "Matheus", "Perfil de acesso": "Admin", "Ações": "editar excluir" },
    { id: "3", Login: "1ss@gmail.com", Nome: "Matheus", "Perfil de acesso": "Admin", "Ações": "editar excluir" },
    { id: "5", Login: "1dd@gmail.com", Nome: "Matheus", "Perfil de acesso": "Admin", "Ações": "editar excluir" },
    { id: "6", Login: "fff1@gmail.com", Nome: "Matheus", "Perfil de acesso": "Admin", "Ações": "editar excluir" },
    { id: "7", Login: "1aaa@gmail.com", Nome: "Matheus", "Perfil de acesso": "Admin", "Ações": "editar excluir" },
    { id: "8", Login: "1@gmail.com", Nome: "Matheus", "Perfil de acesso": "Admin", "Ações": "editar excluir" },
    { id: "9", Login: "1@gmail.com", Nome: "Matheus", "Perfil de acesso": "Admin", "Ações": "editar excluir" },
  ];
    
  return (
    <DataGridCustom
      rowsData={ rowsData }
      columnsData={ columns } 
      onClickRow={ (data) => console.log(`redirecionar para o id ${data.id}`) }
      buttonAdd={ () => <button type="button">Botao para add novo entidade</button> }
    />
  );
}
export default UsersList;
