const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//https://webpack.js.org/plugins/mini-css-extract-plugin/#minimizing-for-production
module.exports = {
  mode: 'production',
  /*
   * entry
   */
  entry: {
    index: './src/index.js',
    main: ['./src/main.js', './src/main.scss'],
    editor: ['./src/editor.js', './src/editor.scss'],
  },
  /*
   * source map for bugfixing bundled resources
   */
  devtool: 'inline-source-map',
  plugins: [
    // generates a new index.html
    new HtmlWebpackPlugin({
      title: 'Development',
    }),
    // handles css
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  /*
   * output management
   * https://webpack.js.org/guides/output-management/
   */
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  /*
   * split duplicate dependencies
   * https://webpack.js.org/guides/code-splitting/
   *
   */
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  /*
   * file loaders
   * module type: https://webpack.js.org/guides/asset-modules/
   * sass https://webpack.js.org/guides/entry-advanced/
   * resolve url loader: https://github.com/bholloway/resolve-url-loader/blob/v4-maintenance/packages/resolve-url-loader/README.md
   */
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          //'style-loader'
          {
            // Extract css
            loader: MiniCssExtractPlugin.loader,
          },
          {
            // Translates CSS into CommonJS
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            //
            loader: 'postcss-loader',
          },
          {
            // resolve URL
            loader: 'resolve-url-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require("sass"),
              sourceMap: true,
            }
          }
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      },
    ],
  },
  //
  //entry: {
  //  page: ['./analytics', './app']
  //}
};
