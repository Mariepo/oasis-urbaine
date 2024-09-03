const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

// Routes
const productsRoutes = require('./Routes/ProductsRoutes');
const productTypesRoutes = require('./Routes/ProductTypesRoutes');
const categoriesRoutes = require('./Routes/CategoriesRoutes');
const usersRoutes = require('./Routes/UsersRoutes');
const ordersRoutes = require('./Routes/OrdersRoutes');
const deliverMethodsRoutes = require('./Routes/DeliveryMethodsRoutes');
const paymentMethodsRoutes = require('./Routes/PaymentMethodsRoutes');
const productCategoryRoutes = require('./Routes/ProductCategoryRoutes');

app.use('/products', productsRoutes);
app.use('/product-types', productTypesRoutes);
app.use('/categories', categoriesRoutes);
app.use('/product-category', productCategoryRoutes);
app.use('/users', usersRoutes);
app.use('/orders', ordersRoutes);
app.use('/delivery', deliverMethodsRoutes);
app.use('/payments', paymentMethodsRoutes);

app.listen(port, () => {
    console.log("Votre serveur est lancé sur http://127.0.0.1:"+port);
})