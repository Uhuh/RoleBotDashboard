const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require("path");

module.exports = [
  {
    mode: 'development',
    entry: './src/index.tsx',
    target: 'web',
    module: {
      rules: [{
        test: /\.tsx?$/,
        include: /src/,
        use: [{ loader: 'ts-loader' }]
      }]
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'app.js'
    },
    node: {
      fs: 'empty',
      tls: 'empty'
    },
    
    devServer: {
      historyApiFallback: true,
      contentBase: path.join(__dirname, 'dist'),
      port: 8000
    },

    plugins: [
      new Dotenv({
        path: './.env',
        safe: false
      }),
      new HtmlWebpackPlugin({
        template: "./src/index.html"
      })      
    ],

    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
  }
];