const path = require('path');
const assetPath = './src/assets';
const jsPath= assetPath + '/js';
const cssPath = assetPath + '/css';
const scssPath = assetPath + '/scss';
const outputPath = 'dist';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

//https://webpack.js.org/plugins/mini-css-extract-plugin/#minimizing-for-production
module.exports = {
  mode: 'production',
  /*
   * entry
   */
  entry: {
    bundle: jsPath + '/bundle.js',
    main: scssPath + '/main.scss',
    editor: scssPath + '/editor.scss',
  },
  /*
   * source map for bugfixing bundled resources
   */
  devtool: 'source-map',
  plugins: [
    // generates a new index.html
    new HtmlWebpackPlugin({
      title: 'Production',
    }),
    new RemoveEmptyScriptsPlugin(),
    // handles css
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].css',
    }),
  ],
  /*
   * output management
   * https://webpack.js.org/guides/output-management/
   */
  output: {
    filename: 'assets/js/[name].js',
    path: path.resolve(__dirname, outputPath),
    clean: true,
  },
  /*
   * split duplicate dependencies
   * https://webpack.js.org/guides/code-splitting/
   *
   */
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],
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
        test: /\.css$/,
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
          filename: 'assets/images/[name][ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]'
        }
      },
    ],
  },
  //
  //entry: {
  //  page: ['./analytics', './app']
  //}
};
