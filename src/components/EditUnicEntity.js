/* eslint-disable react/jsx-max-depth */
import { Box, Button, Typography } from "@mui/material";
import React, {useState} from "react";
import EditIcon from "@mui/icons-material/Edit";
import PropTypes from "prop-types";
import ModalConfirmation from "./ModalConfirmation";
import DeleteIcon from "@mui/icons-material/Delete";
import PaperResponsive from "./PaperResponsive";


const sxBox = {
  display: "flex", 
  flexFlow: "column wrap",
  justifyContent: "space-evenly",
  alignItems: "center",
  border: "solid 1px gray",
  borderRadius: "5px",
  margin: "10px",
  padding: "10px 0",
  height: "650px"
}; 

const sxBoxForm = {
  display: "flex", 
  flexFlow: "column wrap",
  justifyContent: "space-evenly",
  alignItems: "flex-left",
  border: "solid 1px gray",
  borderRadius: "5px",
  padding: "10px 10px",
  width: "90%",
  height: "450px"
};

const sxBtnsEdit = {
  display: "flex", 
  flexFlow: "row", width: "250px",
  alignItems: "center",
  justifyContent: "space-around"
};


function EditUnicEntity({children, tittle, setEditing, 
  isEditing, handleClickExcluir, 
  handleClickSave, handleClickCancel, permissionForEdit, permissionForDelete}) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <PaperResponsive>
      <ModalConfirmation
        actionCaseConfirm={ handleClickExcluir }
        stateForOpen={ [openModal, setOpenModal] }
      >
        <Typography
          variant="p"
          sx={ {mb: 2} }
        >
          Você tem certeza que deseja excluir?
        </Typography>      
      </ModalConfirmation>
      <Box sx={ sxBox }>
        <Box sx={ { display: "flex", justifyContent: "space-between", width: "100%"} }>
          <Box sx={ {padding: "5px 0"} }>
            <Typography
              variant="h1"
              sx={ {fontSize: "18px", marginLeft: "10px"} }
            >
              {tittle}
            </Typography>
          </Box>
          <Box 
            sx={ sxBtnsEdit }
          >
            <Button
              sx={ {minWidth: "44px"} }
              disabled={ !permissionForEdit }
              onClick={ setEditing }
              size="small"
              variant="contained"
            >
              <EditIcon />
            </Button>
            <Button
              sx={ {minWidth: "44px"} }
              disabled={ !permissionForDelete }
              onClick={ () => setOpenModal(true) }
              size="small"
              color="error"
              variant="contained"
            >
              <DeleteIcon />
            </Button>

          </Box>
        </Box>
        <Box sx={ sxBoxForm }>
          {children}
        </Box>
        <Box sx={ { display: "flex", width: "80%", justifyContent: "space-around"} }>
          <Button
            size="small"
            color="success"
            onClick={ handleClickSave }
            disabled={ !isEditing }
            variant="contained"
          >Salvar
          </Button>
          <Button
            size="small"
            onClick={ handleClickCancel }
            disabled={ !isEditing }
            variant="contained"
          >Cancelar
          </Button>
        </Box>
      </Box>
    </PaperResponsive>
  );
}

EditUnicEntity.defaultProps = {
  permissionForEdit: true,
  permissionForDelete: true
};



EditUnicEntity.propTypes = {
  children: PropTypes.node.isRequired,
  tittle: PropTypes.string.isRequired,
  setEditing: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  permissionForEdit: PropTypes.bool,
  permissionForDelete: PropTypes.bool,
  handleClickExcluir: PropTypes.func.isRequired,
  handleClickSave: PropTypes.func.isRequired,
  handleClickCancel: PropTypes.func.isRequired,
};

export default EditUnicEntity;
