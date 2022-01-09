import React, {useEffect, useState} from "react";
import DataGridCustom from "../components/dataGridCustom/DataGridCustom";
import { getUsersList } from "../mockRequests/mockAPI";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Button } from "@mui/material";

function UsersList() {

  const [columns] = useState([
    { field: "login", headerName: "Login", width: 200 },
    { field: "nome", headerName: "Nome", width: 150 },
    { field: "perfil", headerName: "Perfil de acesso", width: 150 },
  ]);

  const [rowsData, setRowsData ] = useState([]);

  const requestUser = async () => {
    const response = await getUsersList();
    const userList = response.map(({id, login, fullName, perfil}) => ({
      id,
      login,
      nome: fullName,
      perfil
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
      onClickRow={ (data) => console.log(`redirecionar para o id ${data.id}`) }
      buttonAdd={ buttonAddUser }
    />
  );
}
export default UsersList;
