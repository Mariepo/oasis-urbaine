const { Model, DataTypes } = require("sequelize");
const sequelize = require('../Config/Sequelize');

class ProductTypes extends Model {

}

ProductTypes.init({
    id : {
        type : DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    description : {
        type : DataTypes.TEXT,
        allowNull : true
    }
}, {
    sequelize,
    modelName : "ProductTypes",
    tableName : "product_types",
    timestamps : false
})

module.exports = ProductTypes;