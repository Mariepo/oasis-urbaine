const { Model, DataTypes } = require("sequelize");
const sequelize = require('../Config/Sequelize');


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
    }
    }, {
        sequelize,
        modelName : "Categories",
        tableName : "categories",
        timestamps : false
    }
)


module.exports = Categories;