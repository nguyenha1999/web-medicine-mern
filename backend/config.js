const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3001,
  jwtSecret: process.env.JWT_SECRET || 'YOUR_secret_key',
  mongoUri:
    process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    'mongodb://localhost:27017/medicine_mern_database'
  // 'mongodb://' + (process.env.IP || 'localhost') + ':' +
  // (process.env.MONGO_PORT || '27017') +
  // '/<db_name>'
};

module.exports = config;
