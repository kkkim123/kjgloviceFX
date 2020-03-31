module.exports = {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|jp(e*)g)$/,
        loader: 'url-loader',
        options: { 
            limit: 8000,
            name: 'images/[hash]-[name].[ext]'
        } 
      },
      {
        test: /\.svg$/,
        loader: 'file-loader'
    } 
    ]
  }
};