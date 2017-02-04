const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const validate = require('webpack-validator');
const Joi = validate.Joi;
const LessPluginCleanCSS = require('less-plugin-clean-css');
const autoprefixer = require('autoprefixer');
const package = require('./package.json');

const pathsBase = {
  src: path.join(__dirname, 'src'),
  images: path.resolve(path.join(__dirname, 'content'), 'img'),
  build: path.join(__dirname, 'www'),
  modules: path.join(__dirname, 'node_modules')
};

const paths = {
  src: pathsBase.src,
  build: pathsBase.build,
  modules: pathsBase.modules,
  indexTemplate: path.resolve(pathsBase.src, 'index.ejs'),
  favicon: path.resolve(pathsBase.images, 'favicon-32x32.png')
};

const extractCSS = new ExtractTextPlugin('[name].[chunkhash].css', { allChunks: false });

const config = {
  entry: {
    index: path.resolve(paths.src, 'index.js'),
    vendor: Object.keys(package.dependencies)
  },
  output: {
    path: paths.build,
    filename: '[name].[chunkhash].js',
    publicPath: '/',
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
        exclude: /node_modules/,
        loaders: ['babel']
      },
      {
        test: /mui.css/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(css|less)$/,
        loader: extractCSS.extract(['css', 'less', 'postcss']),
        exclude: /node_modules/
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=assets/[hash].[ext]',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
        ],
        exclude: /node_modules/,
        include : paths.images
      }],
  },
  postcss: function () {
    return [autoprefixer];
  },
  lessLoader: {
    lessPlugins: [new LessPluginCleanCSS({ advanced: true })]
  },
  resolveLoader: {
    root: [paths.modules],
  },
  resolve: {
    root: [paths.modules],
    extensions: ['', '.js', '.jsx'],
    alias: {
      'react$': path.join(__dirname, 'node_modules', 'react', 'dist', 'react.min.js'),
      'react-dom$': path.join(__dirname, 'node_modules', 'react-dom', 'dist', 'react-dom.min.js'),
      'redux$': path.join(__dirname, 'node_modules', 'redux','dist', 'redux.min.js'),
      'react-redux$': path.join(__dirname, 'node_modules', 'react-redux','dist', 'react-redux.min.js')
    }
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new webpack.DefinePlugin({
      '_DEBUG_': false,
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
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      compress: {
        warnings: true,
        drop_console: true
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.[chunkhash].js'),
    extractCSS,
    new HtmlWebpackPlugin({
      title: 'Web Frameworks Presentation',
      template: paths.indexTemplate,
      favicon: paths.favicon
    })
  ]
};


const configExtension = Joi.object({
  lessLoader: Joi.object().keys({
    lessPlugins: Joi.array()
  })
});


//---------------------------------------------------------------------------
console.log(`Webpack configuration for environment: ${process.env.NODE_ENV}`);


module.exports = validate(config, { schemaExtension: configExtension });