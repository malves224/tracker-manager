import React from "react";
import { Navigate} from "react-router-dom";
import { connect } from "react-redux";
import storage from "../../../util/storage/store";
import PropTypes from "prop-types";
import { setUser } from "../../../actions";
import NoAcess from "../../../pages/NoAcess";

function RequireAuth({children, getPermissions, setUserAction}) {

  const updateUser = () => {
    setUserAction(storage.get("dataUser"));
  };

  const userHasToken = storage.get("token") !== null;

  if(!userHasToken) {
    return <Navigate to="/" />;
  }
  
  getPermissions.length === 0
    && updateUser();// garante que nao perca o estado global ao atualizar a page  
  
  const hasPermisionAcesso = getPermissions
    .some((perm) => perm.page === children.type.name);

  if(hasPermisionAcesso){
    return children;
  } else {
    return <NoAcess />;
  }
}

const mapStateToProps = (state) => ({
  getPermissions: state.user.perfilData.permissions,
});

const mapDispatchToProps = (dispatch) => ({
  setUserAction: (payload) => dispatch(setUser(payload)),
});

RequireAuth.propTypes = {
  children: PropTypes.node,
  getPermissions: PropTypes.arrayOf(PropTypes.object),
  setUserAction: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(RequireAuth);
