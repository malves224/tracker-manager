import React, {useState} from "react";
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

export default function Login() {
  const [acesso, setAcesso] = useState(initialState());
  const [alertOpen, setAlertOpen] = useState(false);
  const [isLoading, setLoading ] = useState(false);
  const styles = useStyles();

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
      const response = await authenticationLogin(email.value, senha.value);
      console.log(response);// autenticar o usuario 
    } catch (error) {
      setAcesso(initialState());
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
        não foi possível encontrar um usuário com esse e-mail e senha.      
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
              loadingPosition="start"
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
