//@ts-check
'use strict';

const path = require('path');

/** @typedef {import('webpack').Configuration} WebpackConfig **/
/** @type WebpackConfig */
const common = {
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    externals: {
        vscode: 'commonjs vscode'
    }
};

/**
 * @param {*} _env
 * @param {*} argv
 * @returns WebpackConfig[]
 */
module.exports = (_env, argv) => [
    {
        ...common,
        target: 'node',
        entry: {
            extension: './src/extension.ts'
        },
    },
    {
        ...common,
        target: 'webworker',
        entry: {
            'web-extension': './src/extension.ts'
        }
    }
];
