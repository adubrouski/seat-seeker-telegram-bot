const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, options) => {
  const isDev = options.mode === 'development';

  return {
    entry: './src/index.ts',
    output: {
      filename: isDev ? 'bundle.js' : '[contenthash].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    mode: process.env.MODE,
    resolve: {
      extensions: ['.webpack.js', '.web.js', '.ts', '.js'],
    },
    plugins: [new CleanWebpackPlugin()],
    module: {
      rules: [{ test: /\.ts$/, loader: 'ts-loader' }],
    },
  };
};
