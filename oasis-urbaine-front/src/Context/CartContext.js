import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

// Création du contexte
const CartContext = createContext();

// Création d'un composant qui fournit les valeurs du contexte aux composants enfants
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Sauvegarde du panier dans le localStorage chaque fois qu'il est modifié
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);    

    // Ajouter un produit au panier
    const addToCart = (product, doToast) => {
        setCartItems((previousItems) => {
            const existingItem = previousItems.find((item) => item.id === product.id);
            if (existingItem) {
                const updatedCart = previousItems.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
                if (doToast) {
                    toast.success("Article ajouté au panier");
                }
                return updatedCart;
            } else {
                const updatedCart = [...previousItems, { ...product, quantity: 1 }];
                if (doToast) {
                    toast.success("Article ajouté au panier");
                }
                return updatedCart;
            }
        });
    };
    
    const removeFromCart = (productId) => {
        setCartItems((previousItems) => {
            // Recherchez l'article dans le panier
            const existingItem = previousItems.find((item) => item.id === productId);
            
            if (existingItem) {
                if (existingItem.quantity === 1) {
                    // Si la quantité est 1, supprimez l'article
                    return previousItems.filter(item => item.id !== productId);
                } else {
                    // Sinon, décrémentez la quantité
                    return previousItems.map((item) =>
                        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
                    );
                }
            }
            return previousItems; // Retourne l'état précédent si rien ne change
        });
    }
    
    const deleteFromCart = (productId) => {
        setCartItems((previousItems) => { return previousItems.filter(item => item.id !== productId) });
    };

    return (
        //Fournit les valeurs cartItems, addToCart, et removeFromCart aux composants enfants
        <CartContext.Provider value={{ cartItems, addToCart, deleteFromCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
