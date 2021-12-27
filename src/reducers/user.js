import { ADD_USER } from "../actions";

const initialState = {
  email: "",
};

const user = (state = initialState, { type, payload }) => {
  switch (type) {
  case ADD_USER:
    return { ...state, ...payload };

  default:
    return state;
  }
};

export default user;
