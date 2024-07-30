import React, { useEffect, useState } from 'react';
import ProductsService from '../Services/ProductsService';

function ProductsPage() {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await ProductsService.fetchProducts();
            setProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return <>
        <div>
            {products.map((product) => {
                return <p>{product.title}</p>
            })}
        </div>
    </>
}

export default ProductsPage
