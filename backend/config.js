const config = {
  env: process.env.NODE_ENV || "dev",
  port: process.env.PORT || 3001,
  jwtSecret: process.env.JWT_SECRET || "havnd",
  mongoUri: "mongodb://localhost:27017/medicine_mern_database",
};

module.exports = config;
