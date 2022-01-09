/* eslint-disable react/no-multi-comp */
import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import {
  DataGrid,
} from "@mui/x-data-grid";
import QuickSearchToolbar from "./QuickSearchTolbar";
import "./style/dataGridCustom.css";

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

function DataGridCustom({rowsData, columnsData, onClickRow, buttonAdd}) {
  
  const [searchText, setSearchText] = React.useState("");
  
  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = rowsData.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setRows(filteredRows);
  };
  
  return (
    <Box>
      <DataGrid
        disableColumnFilter
        pageSize={ 25 }
        getRowClassName={ () => "row" }
        autoHeight
        isRowSelectable={ (data) => onClickRow(data) }
        sx={ { padding: "5px"} }
        components={ { Toolbar: QuickSearchToolbar } }
        rows={ rowsData }
        loading={ rowsData.length === 0 ? true : false }
        columns={ columnsData }
        componentsProps={ {
          toolbar: {  
            value: searchText,
            onChange: (event) => requestSearch(event.target.value),
            clearSearch: () => requestSearch(""),
            button: buttonAdd
          },
        } }
      />
    </Box>
  );
}

DataGridCustom.propTypes = {
  rowsData: PropTypes.arrayOf(PropTypes.object).isRequired,
  columnsData: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClickRow: PropTypes.func.isRequired,
  buttonAdd: PropTypes.func.isRequired
};

export default DataGridCustom;
