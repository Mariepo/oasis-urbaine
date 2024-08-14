const { Model, DataTypes } = require("sequelize");
const sequelize = require('../Config/Sequelize');
const Users = require('./Users');
const DeliveryMethods = require('./DeliveryMethods');
const PaymentMethods = require('./PaymentMethods');
const OrderItems = require("./OrderItems");

class Orders extends Model {}

Orders.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
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
    },
    id_payment_method: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: PaymentMethods,
            key: 'id'
        }
    }}, {
    sequelize,
    modelName: "Orders",
    tableName: "orders",
    timestamps: false
});

Orders.belongsTo(Users, { as: "user", foreignKey: "id_user" });
Orders.belongsTo(DeliveryMethods, { as: "delivery_method", foreignKey: "id_delivery_method" });
Orders.belongsTo(PaymentMethods, { as: "payment_method", foreignKey: "id_payment_method" });
Orders.hasMany(OrderItems, { as: "order_items", foreignKey: "id_order" });


module.exports = Orders;

