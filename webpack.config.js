const HtmlWebpackPlugin = require("html-webpack-plugin");
// import MiniCssExtractPlugin from "mini-css-extract-plugin";
// import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
const CopyPlugin = require("copy-webpack-plugin");

// 'production' か 'development' を指定
const MODE = 'development';
 
const enabledSourceMap = (MODE === 'development');

module.exports = {
  mode: MODE,

  entry: './src/index.js',
  output: {
    filename: `bundle.js`,
    path: `${__dirname}/dist`
  },
 
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'css-loader',
          'style-loader'
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          // CSSをバンドルするための機能
          {
            loader: 'css-loader',
            options: {
              // オプションでCSS内のurl()メソッドの取り込みを禁止する
              url: false,
              // ソースマップの利用有無
              sourceMap: enabledSourceMap,
 
              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
              importLoaders: 2
            },
          },
          {
            loader: 'sass-loader',
            options: {
              // ソースマップの利用有無
              sourceMap: enabledSourceMap,
            }
          },
          'import-glob-loader',
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        // Babel のオプションを指定する
        options: {
          presets: [
            '@babel/preset-env'
          ],
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.json']
  },
  target: ["web"],
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: `${__dirname}/static/`,
          to: `${__dirname}/dist`
        }
      ]
    }),
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/index.html`
    })
  ],
};