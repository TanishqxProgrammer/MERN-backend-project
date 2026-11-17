require("dotenv").config();

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined in the environment variables");
}
if (!process.env.JWT_KEY) {
  throw new Error("JWT_KEY is not defined in the environment variables");
}

const config = {
  MONGO_URI: process.env.MONGO_URI,
  JWT_KEY: process.env.JWT_KEY,
};


module.exports = config;