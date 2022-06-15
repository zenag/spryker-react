const webpack = require( 'webpack' );
const WebpackDevServer = require( 'webpack-dev-server' );
const config = require( './configs/env_config' );
const webpackConfig = require( './webpack.config' );

new WebpackDevServer( webpack( webpackConfig ), {
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    historyApiFallback: true,
}).listen( config.DEV_SERVER_PORT, config.DEV_SERVER_HOST, function (error, result) {
    if (error) {
        console.error( error );
    }
    console.info( 'Running Webpack Dev Server at ' + config.DEV_SERVER_HOST + ':' + config.DEV_SERVER_PORT );
});
