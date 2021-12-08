const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const glob = require('glob');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, options) => {
  const isDev = options.mode === 'development';

  return {
    entry: glob
      .sync('./src/**/*.ts', { ignore: './src/**/*.test.js' })
      .reduce((acc, file) => {
        acc[file.replace(/^\.\/src\/(.*?)\.ts$/, (_, filename) => filename)] =
          file;
        return acc;
      }, {}),
    output: {
      path: path.resolve(__dirname, 'dist'),
    },
    mode: options.mode,
    target: 'node',
    resolve: {
      extensions: ['.webpack.js', '.web.js', '.ts', '.js'],
    },
    optimization: {
      minimize: !isDev,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
        }),
      ],
    },
    plugins: [new CleanWebpackPlugin()],
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                plugins: [
                  [
                    '@babel/plugin-transform-modules-commonjs',
                    {
                      importInterop: 'node',
                    },
                  ],
                ],
              },
            },
            { loader: 'ts-loader' },
          ],
        },
      ],
    },
  };
};
