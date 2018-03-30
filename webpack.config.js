const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')


module.exports = env => {
  
  const mode = env && env.production ? 'production' : 'development'

  return {
    mode,
    entry: {
      main: './src/index.ts',
      // vendor: ['matter-js'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    output: {
      filename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: "Evac Sim"
      })
    ],
    devtool: 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: 9000
    },
    // optimization: {
    // 	splitChunks: {
    // 		cacheGroups: {
    // 			vendor1: {
    // 				name: "matter-js",
    // 				test: "matter-js",
    // 				enforce: true
    // 			},
    // 		}
    // 	}
    // },
  }
}