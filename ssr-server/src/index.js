const Koa = require("koa");

const app = new Koa();

app.listen(8080, () => {
  console.log("app is running on port", 8080);
});
