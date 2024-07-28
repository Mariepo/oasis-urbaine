const { Model } = require("sequelize");
const sequelize = require("../Config/Sequelize")

class ProductCategory extends Model {

}

ProductCategory.init({
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    id_product : {
        type : DataTypes.INTEGER,
        references : {
            model : "Products",
            key : "id"
        }
    },
    id_category : {
        type : DataTypes.INTEGER,
        references : {
            model : "Categories",
            key : "id"
        }
    }   
})

module.exports = ProductCategory;