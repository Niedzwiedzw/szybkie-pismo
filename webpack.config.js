module.exports = {
  module: {
    rules: [
      {
        test: /\.durlex$/i,
        use: [
          {
            loader: 'raw-loader',
            options: {
              esModule: false,
            },
          },
        ],
      },
    ],
  },
};
