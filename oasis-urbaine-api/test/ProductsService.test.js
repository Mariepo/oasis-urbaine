const ProductsService = require("../Services/ProductsService");
// const Products = require("../Models/Products")


test("add product", async () => {
    // arrange
    const productData = { title: "velo", price: 500 };
    const products = await ProductsService.getAllProducts();
    const productsQuantity = products.length;
    
    // act
    const product = await ProductsService.addProduct(productData);

    // assert - vérifications sur le produit ajouté
    expect(product.title).toEqual("velo");
    expect(product.price).toEqual(500);
    expect(product.id).toBeDefined(); // Vérifie que l'id a été généré automatique

    // assert - vérifie que la quantité totale de produits a augmenté de 1
    const newProducts = await ProductsService.getAllProducts();
    expect(newProducts.length).toBe(productsQuantity + 1);
})

test("get products", async () => {
    // act
    const products = await ProductsService.getAllProducts();

    // assert 
    expect(products.length).toBe(19);
    expect(Array.isArray(products)).toBe(true);

    products.forEach((product) => {
        expect(product).toHaveProperty("id");
        expect(product).toHaveProperty("title");
        expect(product).toHaveProperty("description");
        expect(product).toHaveProperty("image_thumbnail");
        expect(product).toHaveProperty("image_large");
        expect(product).toHaveProperty("price");
        expect(product).toHaveProperty("dimension");
        expect(product).toHaveProperty("care_exposure");
        expect(product).toHaveProperty("care_watering");
        expect(product).toHaveProperty("care_temperature");
        expect(product).toHaveProperty("id_product_type");
        expect(product).toHaveProperty("created_at");
        expect(product).toHaveProperty("updated_at");
        expect(Array.isArray(product.categories)).toBe(true);
    });
})

