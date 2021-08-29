import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import jwt_decoded from "jwt-decode";

function PrivateRoute({ component: Component, roles, ...rest }) {
  const { user, loggedIn } = useSelector((state) =>
    state.get("authentification")
  );

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!loggedIn) {
          return <Redirect to="/login" />;
        }

        const jwt_token = jwt_decoded(user.token);
        if (jwt_token.exp * 1000 < Date.now()) {
          localStorage.clear();
          return <Redirect to="/" />;
        }

        if (roles && roles.indexOf(user.role) === -1) {
          return <Redirect to="/" />;
        }

        return <Component {...props} />;
      }}
    />
  );
}

export default PrivateRoute;
