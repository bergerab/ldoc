const path = require('path');

module.exports = {
    entry: [
        './src/ldoc.js',
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'ldoc.js',
        libraryTarget: 'umd',
        globalObject: 'this',
        library: 'ldoc',        
    },
    module: {
        rules: [
            {
                loader: 'babel-loader',
                test: /\.js$/,
                include: [path.resolve(__dirname, 'src')],
                exclude: /node_modules/,
                query: {
                    presets: ['@babel/env']
                }
            }
        ]
    }
};
