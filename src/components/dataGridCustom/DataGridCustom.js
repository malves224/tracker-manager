import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import {
  DataGrid,
} from "@mui/x-data-grid";
import QuickSearchToolbar from "./QuickSearchTolbar";
import "./style/dataGridCustom.css";

function DataGridCustom({
  rowsData, columnsData, onClickRow, buttonAdd, 
  requestSearch, searchText, loading}) {

  return (
    <Box>
      <DataGrid
        pageSize={ 25 }
        getRowClassName={ () => "row" }
        autoHeight
        isRowSelectable={ (data) => onClickRow(data) }
        sx={ { padding: "5px"} }
        components={ { Toolbar: QuickSearchToolbar } }
        rows={ rowsData }
        loading={ loading }
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
  buttonAdd: PropTypes.func.isRequired,
  requestSearch: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default DataGridCustom;
