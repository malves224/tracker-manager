import { combineReducers } from "redux";
import user from "./user";
import alertGlobal from "./alertGlobal";

const rootReducer = combineReducers({
  user,
  alertGlobal,
});

export default rootReducer;
