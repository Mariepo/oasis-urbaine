const { Model, DataTypes } = require("sequelize");
const sequelize = require('../Config/Sequelize');
const Users = require('./Users');
const DeliveryMethods = require('./DeliveryMethods');

class Orders extends Model {}

Orders.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: 'En attente'
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    id_delivery_method: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: DeliveryMethods,
            key: 'id'
        }
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Users,
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: "Orders",
    tableName: "orders",
    timestamps: false
});

Orders.belongsTo(Users, { as: "user", foreignKey: "id_user" });
Orders.belongsTo(DeliveryMethods, { as: "delivery_method", foreignKey: "id_delivery_method" });

module.exports = Orders;
