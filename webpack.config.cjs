const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const glob = require('glob');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, options) => {
  const isProductionMode = options.mode === 'production';
  const srcFilesPaths = glob
    .sync('./src/**/*.ts', { ignore: './src/**/*.test.ts' })
    .reduce((acc, file) => {
      acc[file.replace(/^\.\/src\/(.*?)\.ts$/, (_, filename) => filename)] =
        file;
      return acc;
    }, {});

  return {
    entry: isProductionMode ? './src/index.ts' : srcFilesPaths,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProductionMode ? '[name].bundle.cjs' : '[name].cjs',
    },
    mode: options.mode,
    target: 'node',
    resolve: {
      extensions: ['.webpack.js', '.web.js', '.ts', '.js'],
    },
    optimization: {
      minimize: isProductionMode,
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
