import express from "express";

import React from "react";
import ReactDOM from "react-dom/server";
import { StaticRouter } from "react-router-dom";

import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import nodeFetch from "node-fetch";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider, renderToStringWithData } from "react-apollo";
import path from "path";

import App from "./components/App";
import Html from "./Html";

const app = express();

const publicPath = path.join(__dirname, "../build");
app.use("/static", express.static(publicPath));

app.use((req, res) => {
  const client = new ApolloClient({
    ssrMode: true,
    link: new HttpLink({
      uri: "http://localhost:4000",
      fetch: nodeFetch
    }),
    cache: new InMemoryCache()
  });

  const context = {};

  const component = (
    <ApolloProvider client={client}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </ApolloProvider>
  );

  renderToStringWithData(component)
    .then(content => {
      res.status = 200;
      const html = <Html content={content} client={client} />;
      res.send(`<!doctype html>\n${ReactDOM.renderToString(html)}`);
      res.end();
    })
    .catch(e => {
      console.error("RENDERING ERROR:", e); // eslint-disable-line no-console
      res.status(500);
      res.end(
        `An error occurred. Please submit an issue to [https://github.com/apollographql/GitHunt-React] with the following stack trace:\n\n${
          e.stack
        }`
      );
    });
});

app.listen(8080, () => {
  console.log("hello!", 8080);
});
