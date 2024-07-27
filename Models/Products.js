const { Model, DataTypes } = require("sequelize");
const sequelize = require('../Config/Sequelize');
const ProductTypes = require('./ProductTypes');

class Products extends Model {

}

Products.init({
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : ture
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
            key : id
        }
    },
    created_at : {
        type : DataTypes.DATE,
        allowNull : false
    },
    updated_at : {
        type : DataTypes.DATE,
        allowNull : false
    }}, {
        sequelize,
        modelName : "Products",
        tableName : "Products",
        timestamps : false
    }
)

ProductTypes.hasMany(Products, {as : "products", foreignKey : id_product_type});
Products.belongsTo(ProductTypes, {as : "product_types", foreignKey : id});

module.exports = Products;