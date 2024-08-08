const { Model, DataTypes } = require("sequelize");
const sequelize = require('../Config/Sequelize');

class DeliveryMethods extends Model {

}

DeliveryMethods.init({
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    description : {
        type : DataTypes.STRING,
        allowNull : true
    },
    price : {
        type : DataTypes.DECIMAL,
        allowNull : false
    },
}, {
        sequelize,
        modelName : "DeliveryMethods",
        tableName : "delivery_methods",
        timestamps : false
    }
)

module.exports = DeliveryMethods;