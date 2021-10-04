const { whenProd } = require("@craco/craco");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const SimpleProgressWebpackPlugin = require("simple-progress-webpack-plugin");
const webpack = require("webpack");
module.exports = {
    webpack: {
        plugins: whenProd(() => [
            new CompressionWebpackPlugin({
                algorithm: "gzip",
                test: new RegExp("\\.(" + ["js", "css"].join("|") + ")$"),
                threshold: 1024,
                minRatio: 0.8,
            }),
            new UglifyJsPlugin({
                uglifyOptions: {
                    warnings: false,
                    compress: {
                        drop_debugger: true,
                        drop_console: true,
                    },
                },
                sourceMap: false,
                parallel: true,
            }),
            new webpack.optimize.AggressiveMergingPlugin(),
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new SimpleProgressWebpackPlugin(),
        ]),
        optimization: whenProd(() => {
            return {
                splitChunks: {
                    cacheGroups: {
                        commons: {
                            chunks: "initial",
                            minChunks: 2,
                            maxInitialRequests: 5,
                            minSize: 0,
                        },
                        vendor: {
                            test: /node_modules/,
                            chunks: "initial",
                            name: "vendor",
                            priority: 10,
                            enforce: true,
                        },
                    },
                },
            };
        }),
    },
    babel: {
        loaderOptions: {
            ignore: ["./node_modules/mapbox-gl/dist/mapbox-gl.js"],
        },
    },
};
