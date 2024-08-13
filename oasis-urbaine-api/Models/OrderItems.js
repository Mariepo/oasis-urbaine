const { Model, DataTypes } = require("sequelize");
const sequelize = require('../Config/Sequelize');
const Products = require('./Products');
const Orders = require('./Orders');

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
        allowNull: true,
        references: {
            model: Orders,
            key: 'id'
        }
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

OrderItems.belongsTo(Orders, { as: "order", foreignKey: "id_order" });
OrderItems.belongsTo(Products, { as: "product", foreignKey: "id_product" });

module.exports = OrderItems;