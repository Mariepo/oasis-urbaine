const express = require('express');
const app = express();
const port = 3001;

// L'API fonctionne avec json
app.use(express.json());

// Routes
const productsRoutes = require('./Routes/ProductsRoutes');
const productTypesRoutes = require('./Routes/ProductTypesRoutes');
const categoriesRoutes = require('./Routes/CategoriesRoutes');
app.use('/products', productsRoutes);
app.use('/product-types', productTypesRoutes);
app.use('/categories', categoriesRoutes);

app.listen(port, () => {
    console.log("Votre serveur est lancé sur http://127.0.0.1:"+port);
})