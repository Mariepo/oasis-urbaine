const { Model, DataTypes } = require("sequelize");
const sequelize = require('../Config/Sequelize');
const Products = require('./Products');

class OrderItems extends Model {

}

OrderItems.init({
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    quantity : {
        type : DataTypes.INTEGER,
        allowNull :  false
    },
    id_order: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_product: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Products,
            key: 'id'
        }
    }}, 
    {
        sequelize,
        modelName : "OrderItems",
        tableName : "order_items",
        timestamps : false
    }
);

OrderItems.belongsTo(Products, { as: "product", foreignKey: "id_product" });

module.exports = OrderItems;