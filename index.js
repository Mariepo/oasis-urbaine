const express = require('express');
const app = express();
const port = 3301;


app.listen(port, () => {
    console.log("Votre serveur est lancé sur http://127.0.0.1:"+port);
})