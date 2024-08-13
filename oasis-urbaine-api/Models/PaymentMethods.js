const { Model, DataTypes } = require("sequelize");
const sequelize = require('../Config/Sequelize');

class PaymentMethods extends Model {

}

PaymentMethods.init({
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
}, {
        sequelize,
        modelName : "PaymentMethods",
        tableName : "payment_methods",
        timestamps : false
    }
)

module.exports = PaymentMethods;