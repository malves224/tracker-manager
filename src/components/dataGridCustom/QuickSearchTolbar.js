import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import "./style/dataGridCustom.css";

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
  button: PropTypes.func.isRequired,
};

export default QuickSearchToolbar;
