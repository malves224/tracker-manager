/* eslint-disable react/forbid-component-props */
import React, {useState} from "react";
import {  Button, Container, TextField } from "@mui/material";

const useStyles = () => {
  return {
    containerPage: {
      display: "flex",
      height: "calc(100vh)"
    }
  }; 
};

export default function Login() {
  const [acesso, setAcesso] = useState({
    email: "",
    senha: ""
  });
  const styles = useStyles();

  const handleChange = ({target}) => {
    const { id, value } = target;
    setAcesso({
      ...acesso,
      [id]: value,
    });
  };

  return (
    <Container sx={ styles.containerPage }>
      <Container sx={ {display: "flex", "flexFlow": "column"} }>
        <TextField
          onChange={ handleChange }
          value={ acesso.email }
          id="email" 
          label="E-mail"
          variant="outlined"
        />
        <TextField
          onChange={ handleChange }
          value={ acesso.senha }
          id="senha"
          label="Senha"
          type="password"
          autoComplete="current-password"
        />
        <Button variant="contained">Acessar</Button>
      </Container>
      <Container>
        <Container>
          <h1>Area de login</h1>
        </Container>
      </Container> 
    </Container>

  );
}
