const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: {
        colors: true,
        chunks: false,
        'errors-only': true
    }
})
.listen(3100, 'localhost', function (err) {
    if (err) {
        console.log(err);
    }

    console.log('Listening at http://localhost:3100/');
});