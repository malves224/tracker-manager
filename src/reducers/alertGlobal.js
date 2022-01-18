import { THROW_ALERT} from "../actions";


const initialState = {
  value: "", severity:"warning", open: false
};

const alertGlobal = (state = initialState, { type, payload }) => {
  switch (type) {

  case THROW_ALERT:
    return { ...state, ...payload };
    
  default:
    return state;
  }
};

export default alertGlobal;