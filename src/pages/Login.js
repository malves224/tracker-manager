import React, {useState} from "react";
import { Button, Container, TextField, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { checkEmail, checkPassword } from "../util/formValidate";

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

export default function Login() {
  const [acesso, setAcesso] = useState({
    email: {
      value: "",
      isValid: " "
    },
    senha: {
      value: "",
      isValid: false
    }
  });
  const styles = useStyles();

  const MIN_DIGIT_PASSWORD = 8;

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

  const loginIsValid = () => checkEmail(acesso.email.value) && acesso.senha.isValid;

  return (
    <Container class={ styles.containerPage }>
      <Container sx={ {  width: "430px"} }>
        <Paper>
          <Container class={ styles.containerCardLogin }>
            <TextField
              onChange={ handleChange }
              onBlur={ handleBlurEmail }
              value={ acesso.email.value }
              error={ !acesso.email.isValid }
              helperText={ !acesso.email.isValid && "Email Invalido" }
              type="text"
              id="email" 
              label="E-mail"
              variant="outlined"
              size="small"
            />
            <TextField
              onChange={ handleChange }
              value={ acesso.senha.value }
              id="senha"
              label="Senha"
              type="password"
              autoComplete="current-password"
              size="small"
            />     
            <Button
              variant="contained"
              disabled={ !loginIsValid() }
            >Acessar
            </Button>           
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
