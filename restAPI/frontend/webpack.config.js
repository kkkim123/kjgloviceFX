module.exports = {
  mode: "production",
  // output: {
  //   publicPath: "/static/frontend/"
  // },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
              // name: 'images/[name].[ext]?[hash]',              
            }
          }
        ],
        include: /\.module\.css$/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /\.module\.css$/
      },
      {
        test: /\.(png|jp(e*)g)$/,
        loader: "url-loader",
        options: {
          limit: 8000,
          name: "images/[hash]-[name].[ext]",
        }
      },
      {
        test: /\.svg$/,
        loader: "file-loader",
        options: {
          limit: 8000,
          name: "svg/[hash].[ext]"
        }
      }
    ]
  }
};