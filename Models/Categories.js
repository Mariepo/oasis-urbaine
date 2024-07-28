const { Model, DataTypes } = require("sequelize");
const sequelize = require('../Config/Sequelize');
const Products = require('./Products');
const ProductsCategory = require('./ProductCategory');

class Categories extends Model {

}

Categories.init({
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false
    },
    description : {
        type : DataTypes.TEXT,
        allowNull : true
    }
    }, {
        sequelize,
        modelName : "Categories",
        tableName : "categories",
        timestamps : false
    }
)

// Categories.belongsToMany(Products, {as : 'products', foreignKey : 'id_product', through: ProductsCategory});
// Products.belongsToMany(Categories, {as : 'categories', foreignKey: "id_category", through: ProductsCategory});

module.exports = Categories;