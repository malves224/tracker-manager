

const ADD_USER = "ADD_USER";


const setUser = (payload) => ({
  type: ADD_USER,
  payload
});

export {
  ADD_USER,
  setUser
};