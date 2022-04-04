const config = {
  env: process.env.NODE_ENV || "dev",
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri:
    process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    "mongodb+srv://<username>:<password>@cluster0.ibvyp.mongodb.net/<database>?retryWrites=true&w=majority",
  // 'mongodb://' + (process.env.IP || 'localhost') + ':' +
  // (process.env.MONGO_PORT || '27017') +
  // '/<db_name>'
};

module.exports = config;
