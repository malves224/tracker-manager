/* eslint-disable react/prop-types */
import React from "react";
import { connect } from "react-redux";

function NewClient() {
  return (
    <div>
      <h1 id="teste">novo cliente</h1>
    </div>
  );
}

const mapStateToProps = (state) => ({
  getUser: state.user,
});

export default connect(mapStateToProps)(NewClient);
