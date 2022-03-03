import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Modal from "@mui/material/Modal";

function ModalConfirmation({children, actionCaseConfirm, 
  stateForOpen, themeMode}) {
  const [openModal, setOpenModal] = stateForOpen;
  const handleClose = () => setOpenModal(false);

  const style = {
    position: "absolute",
    display: "flex",
    justifyContent: "space-arround",
    flexFlow: "column",
    top: "50%",
    color: themeMode === "dark" ? "white" : "black",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 250,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 3
  };

  return (
    <Modal
      open={ openModal }
      onClose={ handleClose }
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={ style }>
        {children}
        <Box sx={ { display: "flex", justifyContent: "space-around"} }>
          <Button
            onClick={ () => {
              handleClose();
              actionCaseConfirm();
            } }
            size="small"
            variant="contained"
          >
            Sim
          </Button>
          <Button
            onClick={ handleClose }
            size="small"
            color="error"
          >
            Não
          </Button>
        </Box>
      </Box>
    </Modal>

  );
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  themeMode: state.user.config.mode,
});

ModalConfirmation.propTypes = {
  children: PropTypes.node.isRequired,
  actionCaseConfirm: PropTypes.func.isRequired,
  stateForOpen: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
  ])),
  themeMode: PropTypes.string,
};

export default connect(mapStateToProps)(ModalConfirmation);
