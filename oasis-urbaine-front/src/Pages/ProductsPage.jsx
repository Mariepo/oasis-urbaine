import React, { useEffect, useState } from 'react';
import ProductsService from '../Services/ProductsService';
import ProductCard from '../Components/ProductCard';

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
                return <ProductCard product={product} key={product.id}/>
            })}
        </div>
    </>
}

export default ProductsPage
