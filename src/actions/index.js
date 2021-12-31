

const ADD_USER = "ADD_USER";
const LOGOFF_USER = "LOGOFF_USER";
const SWITCH_MODE = "SWITCH_MODE";

const setUser = (payload) => ({
  type: ADD_USER,
  payload
});

const logOffUser = () => ({
  type: LOGOFF_USER,
});

const switchMode = (payload) => ({
  type: SWITCH_MODE,
  payload
});

export {
  ADD_USER,
  setUser,
  LOGOFF_USER,
  logOffUser,
  SWITCH_MODE,
  switchMode,
};