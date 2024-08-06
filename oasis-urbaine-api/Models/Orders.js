const { Model, DataTypes } = require("sequelize");
const sequelize = require('../Config/Sequelize');
const Users = require('./Users');
const DeliveryMethods = require('./Users');

class Orders extends Model {

}

Orders.init({
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    subtotal : {
        type : DataTypes.DECIMAL,
        allowNull : false
    },
    total_amount : {
        type : DataTypes.DECIMAL,
        allowNull : false
    },
    status : {
        type : DataTypes.STRING(100),
        allowNull : true
    },
    created_at : {
        type : DataTypes.DATE,
        allowNull : false
    },
    updated_at : {
        type : DataTypes.DATE,
        allowNull : false
    },
    id_delivery_method : {
        type : DataTypes.INTEGER,
        allowNull : true,
        references : {
            model : "delivery_methods",
            key : "id"
        }
    },
    id_user : {
        type : DataTypes.INTEGER,
        allowNull : true,
        references : {
            model : "users",
            key : "id"
        }
    }}, {
        sequelize,
        modelName : "Orders",
        tableName : "orders",
        timestamps : false
    }
)


Orders.hasOne(Users, {as : "users", foreignKey: "id_users"});
Orders.hasOne(DeliveryMethods, {as : "delivery_methods", foreignKey: "id_delivery_method"});

module.exports = Orders;