const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const PurifyCSSPlugin = require('purifycss-webpack-plugin')

exports.devServer = options => ({
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: 'errors-only',
    host: options.host,
    port: options.port
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({
      multiStep: true
    })
  ]
})

exports.setupCSS = paths => ({
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css?modules'],
        include: paths
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css?modules', 'sass'],
        include: paths
      }
    ]
  }
})

exports.minify = () => ({
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
})

exports.setFreeVariable = (key, value) => ({
  plugins: [
    new webpack.DefinePlugin({
      [key]: JSON.stringify(value)
    })
  ]
})

exports.extractBundle = options => ({
  entry: [
    options.entries
  ],
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: [options.name, 'manifest']
    })
  ]
})

exports.clean = path => ({
  plugins: [
    new CleanWebpackPlugin([path], {
      root: process.cwd()
    })
  ]
})

exports.loadImages = paths => ({
  module: {
    loaders: [
      {
        test: /\.svg$/,
        loader: 'file',
        include: paths
      }
    ]
  }
})

exports.loadFonts = paths => ({
  module: {
    loaders: [
      {
        test: /\.woff(2)?$/,
        loader: 'url',
        query: {
          name: 'fonts/[hash].[ext]'
        },
        include: paths
      }
    ]
  }
})

exports.extractCSS = paths => ({
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css'),
        include: paths
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css', 'sass'),
        include: paths
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].[chunkhash].css')
  ]
})

exports.purifyCSS = paths => ({
  plugins: [
    new PurifyCSSPlugin({
      basePath: process.cwd(),
      paths: paths
    })
  ]
})

exports.compileTypescript = path => ({
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loaders: ['babel', 'ts']
      }
    ]
  }
})

exports.hotModuleReplacement = () => ({
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server'
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})
