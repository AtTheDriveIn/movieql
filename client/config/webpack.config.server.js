const webpack = require("webpack");
const path = require("path");
const paths = require("./paths");

const DEV = process.env.NODE_ENV !== "production";

module.exports = {
  target: "node",
  entry: "./src/server.js",
  output: {
    path: paths.ssrBuildJs,
    filename: "bundle.js",
    publicPath: "/"
  },
  externals: (context, request, callback) => {
    // Externalize all npm modules.
    if (/^[a-z0-9-][a-z0-9-./]+$/.test(request)) {
      return callback(null, `commonjs ${request}`);
    }
    callback();
  },
  module: {
    strictExportPresence: true,
    rules: [
      { parser: { requireEnsure: false } },
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve("url-loader"),
            options: {
              limit: 10000,
              emitFile: false, // 실제로 파일을 생성하지 않음
              name: "static/media/[name].[hash:8].[ext]"
            }
          },
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            include: paths.appSrc,

            loader: require.resolve("babel-loader"),
            options: {
              customize: require.resolve(
                "babel-preset-react-app/webpack-overrides"
              ),

              plugins: [
                [
                  require.resolve("babel-plugin-named-asset-import"),
                  {
                    loaderMap: {
                      svg: {
                        ReactComponent: "@svgr/webpack?-prettier,-svgo![path]"
                      }
                    }
                  }
                ]
              ],
              cacheDirectory: true,
              cacheCompression: false,
              compact: false
            }
          },
          {
            test: /\.(js|mjs)$/,
            exclude: /@babel(?:\/|\\{1,2})runtime/,
            loader: require.resolve("babel-loader"),
            options: {
              babelrc: false,
              configFile: false,
              compact: false,
              presets: [
                [
                  require.resolve("babel-preset-react-app/dependencies"),
                  { helpers: true }
                ]
              ],
              cacheDirectory: true,
              cacheCompression: true,
              sourceMaps: false
            }
          },
          {
            test: /\.css$/,
            loader: require.resolve("css-loader/locals")
            // 뒤에 /locals 를 붙여줘야 실제로 파일을 생성하지 않음.
            // postcss-loader 같은건 생략해도됨.
          },
          {
            test: /\.scss$/,
            use: [
              require.resolve("css-loader/locals"), // 여기도 locals
              require.resolve("sass-loader")
            ]
          },

          {
            loader: require.resolve("file-loader"),
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            options: {
              emitFile: false, // 실제로 파일을 생성하지 않게 함
              name: "static/media/[name].[hash:8].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      // prettier-ignore
      'process.env.NODE_ENV': JSON.stringify(DEV ? 'development' : 'production')
    })
  ],
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
    setImmediate: false
  }
};
