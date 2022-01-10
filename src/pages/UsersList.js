import React, {useEffect, useState} from "react";
import DataGridCustom from "../components/dataGridCustom/DataGridCustom";
import { getUsersList } from "../mockRequests/mockAPI";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {  useHistory } from "react-router-dom";
import { Button } from "@mui/material";

function UsersList() {
  const history = useHistory();

  const [columns] = useState([
    { field: "login", headerName: "Login", width: 200 },
    { field: "nome", headerName: "Nome", width: 150 },
    { field: "perfil", headerName: "Perfil de acesso", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
  ]);

  const [rowsData, setRowsData ] = useState([]);

  const requestUser = async () => {
    const response = await getUsersList();
    const userList = response.map(({id, login, fullName, perfil, status}) => ({
      id,
      login,
      nome: fullName,
      perfil,
      status
    }));
    // implementar local storage simulando db
    setRowsData(userList);
  };
  
  const buttonAddUser = () => {
    return (
      <Button
        onClick={ () => console.log("redirecionar para tela de add") }
        sx={ {display: "flex"} } 
        variant="contained"
      >
        <AddCircleIcon />{"Novo usuário"}
      </Button>
    );
  };

  useEffect(() => {
    requestUser();
    return () => {
      setRowsData([]);
    };
  }, []);

  return (
    <DataGridCustom
      rowsData={ rowsData }
      columnsData={ columns } 
      onClickRow={ (data) => history.push(`/UserInfo/${data.id}`) }
      buttonAdd={ buttonAddUser }
    />
  );
}
export default UsersList;
