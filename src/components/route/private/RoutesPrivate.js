/* eslint-disable react/prop-types */
import React from "react";
import { Navigate} from "react-router-dom";
import storage from "../../../util/storage/store";

function RequireAuth({children}) {
  if(storage.get("token") === null) {
    return <Navigate to="/login" />;
  }
  return children;
}


export default RequireAuth;
