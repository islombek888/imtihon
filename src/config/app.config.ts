export default () => ({
  port: parseInt(process.env.PORT as string, 10) || 3000,
  apiPrefix: process.env.API_PREFIX || 'api',
  nodeEnv: process.env.NODE_ENV || 'development',
});