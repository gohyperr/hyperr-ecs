const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = env => {
  const config = {
    mode: 'development',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'hecs-plugin-core.js',
      library: {
        root: 'HecsPluginCore',
        amd: 'hecs-plugin-core',
        commonjs: 'hecs-plugin-core',
      },
      libraryTarget: 'umd',
      globalObject: 'this',
    },
    devtool: 'source-map',
    node: { fs: 'empty' },
    plugins: [new CleanWebpackPlugin()],
    externals: {
      hecs: {
        commonjs: 'hecs',
        commonjs2: 'hecs',
        amd: 'hecs',
        root: 'hecs',
      },
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
  }
  if (isProduction) {
    config.mode = 'production'
    config.devtool = false
  }
  return config
}