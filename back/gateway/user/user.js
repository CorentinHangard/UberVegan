const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('mysql://root:root@localhost:3306/mydb')

var exports = module.exports = {};


const user = sequelize.define('user',
 {
    email : {
        type : DataTypes.STRING,
        allowNull : false
    },
    password : {
        type: DataTypes.STRING,
        allowNull : false
    },
    id_role : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    enabled : {
        type : DataTypes.TINYINT,
        allowNull : true
    },
    nom : {
        type : DataTypes.STRING,
        allowNull : false
    },
    prenom : {
        type : DataTypes.STRING,
        allowNull : false
    },
    telephone : {
        type : DataTypes.STRING,
        allowNull : false
    },
    code_parrainage : {
        type : DataTypes.STRING,
        allowNull : true
    }


    

},
{
    tableName : 'user',
    timestamps : false
},{

})



const refreshToken = sequelize.define('refresh_token',
{
    user_id : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    refresh_token : {
        type : DataTypes.STRING,
        allowNull : false
    }
},
{
    tableName : 'refresh_token',
    timestamps : false
}
)



const role = sequelize.define('role', {

    nom : {
        type : DataTypes.STRING,
        allowNull : false
    }

},
{
    tableName : 'role',
    timestamps : false
}
)

role.belongsTo(user,{targetKey : 'id_role', foreignKey : 'id'})
user.hasOne(role, { foreignKey : 'id'})
user.hasMany(refreshToken, {sourceKey : 'id', foreignKey : 'user_id'})
user.belongsTo(refreshToken, {targetKey : 'user_id', foreignKey :  'id'})



exports.refresh_token = refreshToken
exports.user = user
exports.sequelize = sequelize
exports.role = role
