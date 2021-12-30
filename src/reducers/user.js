import { ADD_USER, LOGOFF_USER } from "../actions";

const initialState = {
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
  default:
    return state;
  }
};

export default user;
