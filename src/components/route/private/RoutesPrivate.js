/* eslint-disable react/prop-types */
import React from "react";
import { Navigate} from "react-router-dom";
import { connect } from "react-redux";
import storage from "../../../util/storage/store";
import PropTypes from "prop-types";

// eslint-disable-next-line no-unused-vars
function RequireAuth({children, getPermissions}) {
  if(storage.get("token") === null) {
    return <Navigate to="/login" />;
  }
  console.log(getPermissions);
  console.log(children);
  return children;
}

const mapStateToProps = (state) => ({
  getPermissions: state.user,
});

RequireAuth.propTypes = {
  children: PropTypes.node,
};



export default connect(mapStateToProps)(RequireAuth);
