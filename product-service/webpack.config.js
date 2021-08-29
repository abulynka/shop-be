import path from "path";

export default {
  mode: process.env.MODE_ENV === 'production' ? 'production': 'development',
  resolve: {
    extensions: [".jsx", ".json", ".js"]
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.m?js$/,
  //       exclude: /(node_modules|bower_components)/,
  //       use: {
  //         loader: 'babel-loader',
  //         options: {
  //           presets: ['@babel/preset-env']
  //         }
  //       },
  //     }
  //   ]
  // },
  experiments: {
    outputModule: true,
  },
  entry: './handler.js',
  output: {
    libraryTarget: 'module',
    path: path.resolve('dist'),
    filename: 'handler.js',
  },
};
