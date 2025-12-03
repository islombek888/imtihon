export default () => ({
  mail: {
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT as string, 10) || 587,
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
    from: process.env.MAIL_FROM,
  },
});