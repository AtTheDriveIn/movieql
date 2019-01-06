const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const path = require("path");

const render = require("./ssr").default;
const manifest = require("../../client/build/asset-manifest.json");

const app = new Koa();
const router = new Router();

app.use(bodyParser());

const publicPath = path.join(__dirname, "../../client/build");
app.use(koaStatic(publicPath, { index: false }));

const buildHtml = ({ html }) => {
  const jsKeys = Object.keys(manifest)
    .filter(jsKey => jsKey.match(/.js$/))
    .map(key => {
      if (key === "service-worker.js") return;
      return `<script src="${manifest[key]}"></script>`;
    })
    .join("\n");

  const cssKeys = Object.keys(manifest)
    .filter(cssKey => cssKey.match(/.css$/))
    .map(key => {
      return `<link href="${manifest[key]}" rel="stylesheet">`;
    })
    .join("\n");

  //   const preloadedState = JSON.stringify(state).replace(/</g, "\\u003c");
  return `
    <!doctype html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
      <meta name="theme-color" content="#000000">
      <link rel="manifest" href="/manifest.json">
      <link rel="shortcut icon" href="/favicon.ico">
      ${cssKeys}
    </head>
    <body><noscript>You need to enable JavaScript to run this app.</noscript><div id="root">${html}</div>
    <script>
      window.ssr = true;
      window.shouldCancel = true;
    </script>
    ${jsKeys}
    </body>
    </html>
  `;
};

app.use(async ctx => {
  if (ctx.status !== 404 && !ctx.body) return;
  ctx.status = 200;
  // ctx.set("Content-Type", "text/html; charset=utf-8");
  // ctx.body = indexHtml;

  try {
    const result = await render(ctx);
    ctx.body = buildHtml(result);
  } catch (e) {
    console.log(e);
  }
});

app.listen(8080, () => {
  console.log("app is running on port", 8080);
});
