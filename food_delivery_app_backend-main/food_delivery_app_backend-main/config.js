const config = require("./package.json").projectConfig;

module.exports = {
  mongoConfig: {
    connectionUrl: config.mongoConnectionUrl,
    database: "foodapp_db",
    collections: {
      USERS: "users",
      RESTAURANTS: "restaurants",
      CARTS: "carts",
      FOODS: "foods",
      BOOKMARKS: "bookmarks",
      BILL :"bill",
    },
  },
  serverConfig: {
    ip: config.serverIp,
    port: config.serverPort,
  },
  tokenSecret: "food_app_secret",
};
