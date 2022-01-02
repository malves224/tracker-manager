import { ADD_USER, LOGOFF_USER, SWITCH_MODE } from "../actions";

export const initialState = {
  email: "",
  id: "",
  login: "",
  fullName: "",
  contato: "",
  cargo: "",
  perfil: "",
  idPerfil: "",
  perfilData: {
    id: "",
    name: "",
    permissions: []
  },
  token: null,
  config: {
    mode: "light"
  }
};

const user = (state = initialState, { type, payload }) => {
  switch (type) {
  case ADD_USER:
    return { ...state, ...payload };
  case LOGOFF_USER:
    return initialState;
  case SWITCH_MODE:
    return {
      ...state,
      config: {
        mode: state.config.mode === "dark" ? "light" : "dark"
      }
    };
  default:
    return state;
  }
};

export default user;
