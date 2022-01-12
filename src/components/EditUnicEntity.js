import { Box, Button, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PropTypes from "prop-types";
import ModalConfirmation from "./ModalConfirmation";
import React, {useState} from "react";
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
  width: "95%"
}; 

const sxBoxForm = {
  display: "flex", 
  flexFlow: "column wrap",
  justifyContent: "space-evenly",
  alignItems: "flex-left",
  border: "solid 1px gray",
  borderRadius: "5px",
  margin: "10px",
  padding: "10px 10px",
  width: "90%",
  height: "400px"
};

const sxBtnsEdit = {
  display: "flex", 
  flexFlow: "row", width: "250px",
  alignItems: "center",
  justifyContent: "space-around"
};


function EditUnicEntity({children, tittle, setEditing, 
  isEditing, handleClickExcluir, handleClickSave, handleClickCancel}) {
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
              sx={ {fontSize: "26px", marginLeft: "10px"} }
            >
              {tittle}
            </Typography>
          </Box>
          <Box 
            sx={ sxBtnsEdit }
          >
            <Button
              onClick={ setEditing }
              color="primary"
              size="small"
              variant="contained"
              startIcon={ <EditIcon /> }
            >Editar
            </Button>
            <Button
              onClick={ () => setOpenModal(true) }
              color="error"
              size="small"
              variant="contained"
              startIcon={ <DeleteIcon /> }
            >Excluir
            </Button>
          </Box>
        </Box>
        <Box sx={ sxBoxForm }>
          {children}
        </Box>
        <Box sx={ { display: "flex", width: "80%", justifyContent: "space-around"} }>
          <Button
            size="small"

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

EditUnicEntity.propTypes = {
  children: PropTypes.node.isRequired,
  tittle: PropTypes.string.isRequired,
  setEditing: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  handleClickExcluir: PropTypes.func.isRequired,
  handleClickSave: PropTypes.func.isRequired,
  handleClickCancel: PropTypes.func.isRequired,
};

export default EditUnicEntity;