const { Model, DataTypes} = require("sequelize");
const sequelize = require("../Config/Sequelize");
const bcrypt = require('bcrypt');

class Users extends Model {
    async validatePassword(password){
        return await bcrypt.compare(password, this.password);
    }
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
        allowNull : false,
        unique : true
    },
    address : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    postal_code : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    city : {
        type : DataTypes.STRING,
        allowNull : false,
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
        timestamps : false,
        hooks : {
            beforeCreate : async (user) => {
                user.password = await bcrypt.hash(user.password, 10);
            },
            beforeUpdate : async (user) => {
                if (user.changed('password')) {
                    user.password = await bcrypt.hash(user.password, 10);
                }
            }
        }
    })

module.exports = Users;