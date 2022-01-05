/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-multi-comp */
import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import {
  DataGrid,
} from "@mui/x-data-grid";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";



function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

function QuickSearchToolbar({value, onChange, clearSearch, button}) {

  const sxBox = {
    width: {
      xs: 1,
      sm: "auto",
    },
    "& .MuiInput-underline:before": {
      borderBottom: 1,
      borderColor: "divider",
    },
  };
  return (
    <Box
      sx={ {
        p: 0.5,
        pb: 0,
        justifyContent: "space-between",
        display: "flex",
        alignItems: "flex-start",
        flexWrap: "wrap",
      } }
    >
      <div>
        {
          button()
        }
      </div>
      <TextField
        variant="standard"
        value={ value }
        onChange={ onChange }
        placeholder="Pesquise..."
        InputProps={ {
          startAdornment: <SearchIcon fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              sx={ { visibility: value ? "visible" : "hidden" } }
              onClick={ clearSearch }
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        } }
        sx={ sxBox }
      />
    </Box>
  );
}

QuickSearchToolbar.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};


// eslint-disable-next-line react/prop-types
function DataGridCustom({rowsData, columnsData, onClickRow, buttonAdd}) {
  
  const [searchText, setSearchText] = React.useState("");
  const [rows, setRows] = React.useState(rowsData);
  
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
  
  React.useEffect(() => {
    setRows(rowsData);
  }, []);
  
  return (
    <Box sx={ { height: "calc(92vh)", width: 1 } }>
      <DataGrid
        isRowSelectable={ (data) => onClickRow(data) }
        editMode="row"
        sx={ { padding: "5px"} }
        components={ { Toolbar: QuickSearchToolbar } }
        rows={ rows }
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
};

export default DataGridCustom;
