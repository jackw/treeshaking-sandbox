module.exports = {
  webpack: {
    configure: {
      mode: 'production',
      resolve: {
        fallback: {
          buffer: false,
          fs: false,
          stream: false,
          http: false,
          https: false,
          string_decoder: false,
        },
      },
    },
  },
};
