const { Model, DataTypes} = require("sequelize");
const sequelize = require("../Config/Sequelize");

class Users extends Model {

}

Users.init({
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false
    },
    firstname : {
        type : DataTypes.STRING,
        allowNull : false
    },
    password : {
        type : DataTypes.TEXT,
        allowNull : false
    },
    email: {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    phone : {
        type : DataTypes.STRING,
        allowNull : true,
        unique : true
    },
    address : {
        type : DataTypes.STRING,
        allowNull : true,
    },
    postal_code : {
        type : DataTypes.STRING,
        allowNull : true,
    },
    city : {
        type : DataTypes.STRING,
        allowNull : true,
    },
    is_admin : {
        type : DataTypes.TINYINT,
        allowNull : true,
    },
        created_at : {
        type : DataTypes.DATE,
        allowNull : true
    },
    updated_at : {
        type : DataTypes.DATE,
        allowNull : true
    }
}, {
        sequelize,
        modelName : "Users",
        tableName : "users",
        timestamps : false
    })

module.exports = Users;