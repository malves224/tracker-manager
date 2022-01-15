import React, {useEffect, useState} from "react";
import DataGridCustom from "../components/dataGridCustom/DataGridCustom";
import { getUsersList } from "../mockRequests/mockAPI";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {  useHistory } from "react-router-dom";
import { Button } from "@mui/material";

function UsersList() {
  const history = useHistory();
  const [searchText, setSearchText] = useState("");
  const [columns] = useState([
    { field: "login", headerName: "Login", width: 200 },
    { field: "nome", headerName: "Nome", width: 150 },
    { field: "perfil", headerName: "Perfil de acesso", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
  ]);
  const [rowsData, setRowsData ] = useState([]);
  const [rowsFiltred, setRowsFiltred ] = useState([]);

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchValueClean = searchValue.toLowerCase();
    const filteredRows = rowsData.filter((row) => {
      return Object.keys(row).some((field) => {
        return row[field].toLowerCase().includes(searchValueClean);
      });
    });
    setRowsFiltred(filteredRows);
  };

  const requestUser = async () => {
    const response = await getUsersList();
    const userList = response.map(({id, login, fullName, perfil, status}) => ({
      id: id.toString(),
      login,
      nome: fullName,
      perfil,
      status
    }));
    // implementar local storage simulando db
    setRowsData(userList);
    return userList;
  };
  
  const buttonAddUser = () => {
    return (
      <Button
        color="success"
        size="small"
        startIcon={ <AddCircleIcon /> }
        onClick={ () => history.push("/NewUser") }
        sx={ {display: "flex", fontSize: "12px"} } 
        variant="contained"
      >
        Novo usuário
      </Button>
    );
  };

  useEffect(() => {
    requestUser().then((response) => setRowsFiltred(response));
    return () => {
      setRowsData([]);
    };
  }, []);

  return (
    <DataGridCustom
      requestSearch={ requestSearch }
      searchText={ searchText }
      rowsData={ rowsFiltred }
      columnsData={ columns } 
      onClickRow={ (data) => history.push(`/UserInfo/${data.id}`) }
      buttonAdd={ buttonAddUser }
    />
  );
}
export default UsersList;
