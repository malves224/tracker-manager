import React, {useState, useEffect} from "react";
import {  useHistory } from "react-router-dom";
import storage from "../util/storage/store";
import { connect } from "react-redux";
import { setUser } from "../actions";
import PropTypes from "prop-types";
import { AlertTogle } from "../components";
import { Container, 
  TextField, Paper, Card, } from "@mui/material";
import { checkEmail, checkPassword } from "../util/formValidate";
import { authenticationLogin } from "../mockRequests/mockAPI";
import LoadingButton from "@mui/lab/LoadingButton";

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
  const [isLoading, setLoading ] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const navigate = useHistory();
  
  useEffect(() => {
    storage.get("token") !== null && navigate.push("/Home");
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
      storage.set("dataUser", response);// insere os dados do usuario no state global em storage(BACK-END CORRIGIR)
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
    <Paper
      sx={ {
        display: "flex",
        alignItems: "center",
        height: "calc(100vh)",
      } }
    >
      <AlertTogle
        severity="error"
        switchValue={ [alertOpen, setAlertOpen] }
      >
        Não foi possível encontrar um usuário com esse e-mail e senha.      
      </AlertTogle>
      <Container sx={ {  width: "430px" } }>
        <Card variant="outlined">
          <Container
            sx={ {
              display: "flex",
              justifyContent: "space-around",
              height:"280px",
              "flexFlow": "column",
              padding: "15px 60px",
            } }
          >
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
        </Card>
      </Container>
    </Paper>
  );
}

Login.propTypes = {
  setUserAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setUserAction: (payload) => dispatch(setUser(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
