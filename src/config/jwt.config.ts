export default () => ({
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessExpire: '15m',
    refreshExpire: '7d',
  },
});