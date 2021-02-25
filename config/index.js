const env = process.env.ELEVENTY_ENV || "development";

const config = {
  env,
  isDev: env === "development",
  isProd: env === "production",
};

module.exports = config;
