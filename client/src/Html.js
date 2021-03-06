/* eslint-disable react/no-danger */

import React from "react";

const Html = ({ content, client: { cache } }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,shrink-to-fit=no"
        />
        <meta name="theme-color" content="#000000" />
        <title>GitHunt</title>
      </head>
      <body>
        <div id="content" dangerouslySetInnerHTML={{ __html: content }} />
        <script
          charSet="UTF-8"
          dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__=${JSON.stringify(
              cache.extract()
            )};`
          }}
        />
        <script type="text/javascript" src="/static/js/1.96498c94.chunk.js" />
        <script
          type="text/javascript"
          src="/static/js/main.0d3617e0.chunk.js"
        />
      </body>
    </html>
  );
};

export default Html;
