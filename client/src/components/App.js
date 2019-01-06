import React from "react";
// import { GET_MOVIES } from "../graphql/queries";
// import { Query } from "react-apollo";
import { Home } from "../pages";
import { Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </>
  );
};

export default App;
