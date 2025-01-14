export default () => ({
  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '7d',
      },
    },
  },
  'kore': {
    enabled: true,
    resolve: './src/plugins/kore'
  },
});
