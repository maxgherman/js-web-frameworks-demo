const path = require('path');
const webpack = require('webpack');
const validate = require('webpack-validator');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const pathsBase = {
  src: path.join(__dirname, 'src'),
  images: path.resolve(path.join(__dirname, 'content'), 'img'),
  build: path.join(__dirname, 'www'),
  modules: path.join(__dirname, 'node_modules'),
};

const paths = {
  src: pathsBase.src,
  build: pathsBase.build,
  modules: pathsBase.modules,
  indexTemplate: path.resolve(pathsBase.src, 'index.ejs')
};

const extractCSS = new ExtractTextPlugin('[name].[chunkhash].css', { allChunks: false });

const config = {
  entry: [
    'webpack-dev-server/client?http://localhost:3100',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    publicPath: '/',
    path: paths.build,
    filename: '[name].js'
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: ['eslint'],
        include: paths.src
      }
    ],
    loaders: [{
      test: /\.jsx?$/,
      include: paths.src,
      exclude: /node_modules/,
      // Enable caching for improved performance during development
      // It uses default OS directory by default. If you need
      // something more custom, pass a path to it.
      // I.e., babel?cacheDirectory=<path>
      loaders: ['babel?cacheDirectory&retainLines=true']
    },
    {
      test: /mui.css/,
      loader: 'style-loader!css-loader'
    },
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader',
      exclude: /node_modules/
    },
    {
      test: /\.less$/,
      loader: 'style-loader!css-loader!less-loader',
      exclude: /node_modules/
    },
    {
      test: /.*\.(gif|png|jpe?g|svg)$/i,
      loaders: [
        'file?name=[hash].[ext]',
        'image-webpack'
      ],
      exclude: /node_modules/,
      include : paths.images
    }],
  },
  resolveLoader: {
    root: [paths.modules],
  },
  resolve: {
    root: [paths.modules],
    extensions: ['', '.js', '.jsx']
  },
  node: {
    fs: 'empty'
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      '_DEBUG_': true,                     // pre-processor conditional variable
      'process.env': {
        'NODE_ENV': `"${process.env.NODE_ENV}"`
      }
    }),
    new CleanPlugin([paths.build], {
      exclude : [
        'hyperTextPart1.src',
        'hyperTextPart2.src',
        'demo.jsx',
        'demo.css'
      ]
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    extractCSS,  
    new HtmlWebpackPlugin({
      title: 'Web Frameworks Presentation',
      template: paths.indexTemplate
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', '[name].js')
  ]
};

// -----------------------------------------------------------------------------
console.log(`Webpack configuration for environment: ${process.env.NODE_ENV}`);


module.exports = validate(config);