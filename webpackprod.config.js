const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
 const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: {
    bundle: [
      "react-hot-loader/patch",
      "./src/index.js"
    ]
  },
  output: {
    path: path.join(path.join(__dirname, 'dist'), 'js'),
    filename: '[name].js',
    libraryTarget: "amd",
    publicPath: '/'
  },
  resolve: {
    extensions: ['.scss', '.css', '.js', '.json','.webpack.js', '.web.js', '.js', '.jsx'],
    modules: [
      'node_modules',
      path.resolve(__dirname, './node_modules')
    ]
  },
  module: {
    rules: [
      {
        //test: /\.js?$/,
         test: /(\.js|\.jsx)$/,
        loader: 'babel-loader',
        options: {
          presets: [
            ["es2015", { modules: false }],
            "stage-2", "stage-1", "stage-3",
            "react"
          ],
          plugins: [
            "transform-node-env-inline"
          ],
          env: {
            development: {
              plugins: ["react-hot-loader/babel"]
            }
          }
        }
      },
      {
       test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /(\.scss|\.css)$/,
        use: ExtractTextPlugin.extract({
            use: [
              {
                loader: "css-loader",
                options: {
                  modules: true,
                  sourceMap: true,
                  importLoaders: 1,
                  localIdentName: "[name]--[local]--[hash:base64:8]"
                }
              },
              {
                loader: "postcss-loader",
                options: {
                  plugins: function(){
                    return [
                      /* eslint-disable global-require */
                      require('postcss-cssnext')({
                        features: {
                          customProperties: {
                            variables: reactToolboxVariables,
                          },
                        },
                      })
                    ]
                  }

                }
              }
            ]
        })
      },
    ]
  },
  externals: [
      function(context, request, callback) {
          if (/^dojo/.test(request) ||
              /^dojox/.test(request) ||
              /^dijit/.test(request) ||
              /^esri/.test(request)
          ) {
              return callback(null, "amd " + request);
          }
          callback();
      }
  ],
  devServer: {
    inline: true,
    port: 443,
    host: "127.0.0.1",
    historyApiFallback: true
  },
  plugins: [
    new ExtractTextPlugin('../css/style.css'),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
};
