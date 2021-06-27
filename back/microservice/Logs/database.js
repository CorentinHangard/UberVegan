var mongoose = require("mongoose");
const { Sequelize } = require("sequelize");

function initMongoDB() {
  var url = "".concat(
    "mongodb://",
    process.env.MONGODB_USER,
    ":",
    process.env.MONGODB_PASS,
    "@",
    process.env.MONGODB_HOST,
    ":",
    process.env.MONGODB_PORT,
    "/",
    process.env.MONGODB_DB,
    "?authSource=admin"
  );
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.log("MongoDB error on connection", err));
}

function initMSSQLDB() {
  const sequelize = new Sequelize(
    process.env.MSSQL_DB,
    process.env.MSSQL_USER,
    process.env.MSSQL_PASS,
    {
      host: process.env.MSSQL_HOST,
      dialect: "mssql",
      dialectOptions: {
        encrypt: true,
      },
    }
  );
  try {
    sequelize.authenticate();
    console.log("Connected to MSSQL...");
  } catch (error) {
    console.error("MSSQL error on connection", error);
  }
}

module.exports = {
  initMongoDB,
  initMSSQLDB,
};
