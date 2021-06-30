const { Sequelize, DataTypes } = require("sequelize");

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

var exports = (module.exports = {});

const user = sequelize.define(
  "T_USER_USR",
  {
    usr_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    usr_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usr_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usr_status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      allowNull: true,
    },
    rol_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    freezeTableName: true,
    tableName: "T_USER_USR",
    timestamps: false,
  }
);

const refreshToken = sequelize.define(
  "refresh_token",
  {
    refresh_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usr_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "refresh_token",
    timestamps: false,
  }
);

const role = sequelize.define(
  "T_ROLE_ROL",
  {
    rol_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    rol_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "T_ROLE_ROL",
    timestamps: false,
  }
);

role.belongsTo(user, { targetKey: "rol_id", foreignKey: "rol_id" });
user.hasOne(role, { foreignKey: "rol_id" });

user.belongsTo(refreshToken, { targetKey: "usr_id", foreignKey: "usr_id" });
user.hasMany(refreshToken, { sourceKey: "usr_id", foreignKey: "usr_id" });

exports.refresh_token = refreshToken;
exports.user = user;
exports.sequelize = sequelize;
exports.role = role;
