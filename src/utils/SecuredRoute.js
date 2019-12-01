import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const SecuredRoute = ({ component: Component, auth, ...otherProps }) => (
  <Route
    {...otherProps}
    render={props =>
      auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/signin" />
      )
    }
  />
);

SecuredRoute.propTypes = {
    auth : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth : state.auth
})

export default connect(mapStateToProps) (SecuredRoute);