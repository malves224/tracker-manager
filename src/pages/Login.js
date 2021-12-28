import React, {useState, useEffect} from "react";
import {  useNavigate } from "react-router-dom";
import storage from "../util/storage/store";
import { connect } from "react-redux";
import { setUser } from "../actions";
import PropTypes from "prop-types";
import { AlertTogle } from "../components";
import { Container, 
  TextField, Paper, } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { checkEmail, checkPassword } from "../util/formValidate";
import { authenticationLogin } from "../mockRequests/mockAPI";
import LoadingButton from "@mui/lab/LoadingButton";


const useStyles = makeStyles({
  containerPage: {
    display: "flex",
    alignItems: "center",
    height: "calc(100vh)",
  },
  containerCardLogin: {
    display: "flex",
    justifyContent: "space-around",
    height:"280px",
    "flexFlow": "column",
    padding: "15px 60px",
  },
});

const MIN_DIGIT_PASSWORD = 8;

const initialState = () => ({
  email: {
    value: "",
    isValid: " "
  },
  senha: {
    value: "",
    isValid: false
  }
});

function Login({setUserAction}) {
  const [acesso, setAcesso] = useState(initialState());
  const [alertOpen, setAlertOpen] = useState(false);
  const [isLoading, setLoading ] = useState(false);
  const navigate = useNavigate();
  const styles = useStyles();
  
  useEffect(() => {
    storage.get("token") !== null && navigate("/");
  });

  const handleChange = ({target}) => {
    const { id: name, value } = target;
    setAcesso({
      ...acesso,
      [name]: {
        ...acesso[name],
        value,
        ...name === "senha" && { isValid: checkPassword(value, MIN_DIGIT_PASSWORD)},
      },
    });
  };

  const handleBlurEmail = ({target}) => {
    const { id: name, value } = target;
    setAcesso({
      ...acesso,
      [name]: {
        ...acesso[name],
        ...value.length && { isValid: checkEmail(value)},
      }
    });
  };
  const {email, senha } = acesso;

  const onClickAuth = async () => {
    setLoading(true);
    try {
      const response = await authenticationLogin(email.value, senha.value);// ** BACK-END função que irá autenticar o usuario
      setUserAction(response);
      storage.set("token", response.token);
    } catch (error) {
      setAcesso({
        ...acesso,
        senha: {
          value: "",
          isValid: false
        }
      });
      setAlertOpen(true);
    }
    setLoading(false);
  };

  const loginIsValid = () => checkEmail(acesso.email.value) && acesso.senha.isValid;
  return (
    <Container class={ styles.containerPage }>
      <AlertTogle
        alertOptions={ {
          severity:"error",
          isOpen: alertOpen,
          setOpen: setAlertOpen,
        } }
      >
        Não foi possível encontrar um usuário com esse e-mail e senha.      
      </AlertTogle>
      <Container sx={ {  width: "430px" } }>
        <Paper>
          <Container class={ styles.containerCardLogin }>
            <TextField
              onChange={ handleChange }
              onBlur={ handleBlurEmail }
              value={ email.value }
              error={ !email.isValid }
              helperText={ !email.isValid && "Email Invalido" }
              type="text"
              id="email" 
              label="E-mail"
              variant="outlined"
              size="small"
            />
            <TextField
              onChange={ handleChange }
              value={ senha.value }
              id="senha"
              label="Senha"
              type="password"
              autoComplete="current-password"
              size="small"
            />
            <LoadingButton
              loading={ isLoading }
              variant="contained"
              disabled={ !loginIsValid() || isLoading }
              onClick={ onClickAuth }
            >{!isLoading ? "Acessar" : "Aguarde"}
            </LoadingButton>
          </Container>
        </Paper>
      </Container>
      <Container>
        <Container>
          <h1>Area de login</h1>
        </Container>
      </Container>
    </Container>
  );
}

Login.propTypes = {
  setUserAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setUserAction: (payload) => dispatch(setUser(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
