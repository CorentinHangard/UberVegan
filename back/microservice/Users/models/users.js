const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  "UberVegan",
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
      defaultValue: 1,
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

const role = sequelize.define(
  "role",
  {
    rol_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "T_ROLE_ROL",
    timestamps: false,
  }
);

role.belongsTo(user, { targetKey: "rol_id", foreignKey: "rol_id" });
user.hasOne(role, { foreignKey: "rol_id" });

exports.user = user;
exports.sequelize = sequelize;
exports.role = role;
