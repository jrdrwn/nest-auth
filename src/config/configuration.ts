export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  mongo: {
    uri: process.env.MONGO_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  saltRounds: parseInt(process.env.SALT_ROUNDS, 10) || 10,
});
