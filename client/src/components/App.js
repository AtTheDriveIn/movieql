import React from "react";
import { Switch, Route } from "react-router-dom";
import { Home, Detail } from "../pages";

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/movie/:movieId" component={Detail} />
    </Switch>
  );
};

export default App;
