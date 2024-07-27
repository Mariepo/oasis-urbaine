const express = require('express');
const productsRoutes = require('./Routes/ProductsRoutes');
const productTypesRoutes = require('./Routes/ProductTypesRoutes');
const app = express();
const port = 3301;

// L'API fonctionne avec json
app.use(express.json());

// Routes
app.use('/products', productsRoutes);
app.use('/product-types', productTypesRoutes);

app.listen(port, () => {
    console.log("Votre serveur est lancé sur http://127.0.0.1:"+port);
})