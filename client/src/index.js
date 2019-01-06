import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import client from "./apollo";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
