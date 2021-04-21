import React from "react";
import { Route } from "react-router-dom";
import NotFound from "./NotFound";
const ProtectedRoute = ({ isAuth, component: Component, ...rest }) => {

  if (isAuth) {
    return (
      <Route
        {...rest}
        exact
        render={(props) => {
          return <Component />;
        }}
      />
    );
  } else {
    return <Route exact path="/Notfound" component={NotFound} />;
  }
};

export default ProtectedRoute;
