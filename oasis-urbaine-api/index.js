const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const AuthenticateController = require('./Controllers/AuthenticateController');

app.use(express.json());
app.use(cors());

// Routes
const productsRoutes = require('./Routes/ProductsRoutes');
const productTypesRoutes = require('./Routes/ProductTypesRoutes');
const categoriesRoutes = require('./Routes/CategoriesRoutes');
const usersRoutes = require('./Routes/UsersRoutes');
app.use('/products', productsRoutes);
app.use('/product-types', productTypesRoutes);
app.use('/categories', categoriesRoutes);
app.use('/users', usersRoutes);
// app.use('/users', AuthenticateController.authenticateToken, usersRoutes);

app.listen(port, () => {
    console.log("Votre serveur est lancé sur http://127.0.0.1:"+port);
})