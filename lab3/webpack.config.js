const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function generateHtmlPlugins(dir) {
  const files = fs.readdirSync(path.resolve(__dirname, dir));
  return files
    .filter(file => path.extname(file).toLowerCase() === '.html')
    .map(file => new HtmlWebpackPlugin({
      filename: path.join('pages', file), 
      template: path.resolve(__dirname, dir, file)
    }));
}

module.exports = {
  mode: 'none',
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  plugins: [
    ...generateHtmlPlugins('./src/pages'), 
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets/images', to: 'assets/images' }
      ]
    })
  ],
  devServer: {
    static: {
        directory: path.resolve(__dirname, 'dist'), 
    }, 
    compress: true, 
    port: 8080
  }
};