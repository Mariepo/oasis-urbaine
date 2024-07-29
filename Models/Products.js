const { Model, DataTypes } = require("sequelize");
const sequelize = require('../Config/Sequelize');
const ProductTypes = require('./ProductTypes');
const Categories = require("./Categories");
const ProductCategory = require("./ProductCategory");

class Products extends Model {

}

Products.init({
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    title : {
        type : DataTypes.STRING,
        allowNull : false
    },
    description : {
        type : DataTypes.TEXT,
        allowNull : true
    },
    image_thumbnail : {
        type : DataTypes.STRING,
        allowNull : true
    },
    image_large : {
        type : DataTypes.STRING,
        allowNull : true
    },
    price : {
        type : DataTypes.DECIMAL,
        allowNull : false
    },
    stock : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    dimension : {
        type : DataTypes.STRING,
        allowNull : true
    },
    care_exposure : {
        type : DataTypes.STRING,
        allowNull : true
    },
    care_watering : {
        type : DataTypes.STRING,
        allowNull : true
    },
    care_temperature : {
        type : DataTypes.STRING,
        allowNull : true
    },
    id_product_type : {
        type : DataTypes.INTEGER,
        allowNull : true,
        references : {
            model : "product_types",
            key : "id"
        }
    },
    created_at : {
        type : DataTypes.DATE,
        allowNull : true
    },
    updated_at : {
        type : DataTypes.DATE,
        allowNull : true
    }}, {
        sequelize,
        modelName : "products",
        tableName : "products",
        timestamps : false
    }
)


Products.belongsToMany(Categories, {
    through: ProductCategory,
    as: 'categories',
    foreignKey: 'id_product',  
    otherKey: 'id_category' 
});

Categories.belongsToMany(Products, {
    through: ProductCategory,
    as: 'products',
    foreignKey: 'id_category', 
    otherKey: 'id_product'     
});

module.exports = Products;

