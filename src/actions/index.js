

const ADD_USER = "ADD_USER";
const LOGOFF_USER = "LOGOFF_USER";


const setUser = (payload) => ({
  type: ADD_USER,
  payload
});

const logOffUser = () => ({
  type: LOGOFF_USER,
});

export {
  ADD_USER,
  setUser,
  LOGOFF_USER,
  logOffUser
};