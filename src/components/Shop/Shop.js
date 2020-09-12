import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Shop = () => {
    const first20 = fakeData.slice(10, 20);
    const [products, setProducts] = useState(first20)
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map(existingKey => {
            const product = fakeData.find(prd => prd.key === existingKey);
            product.quantity = savedCart[existingKey];
            return product;
        })
        setCart(previousCart);
    },[])

    const handleProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(prd => prd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if(sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(prd => prd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    

    }
    return (
        <div className= "twin-container">
            <div className="product-container">
                    {
                        products.map(pro => 
                        <Product
                        key = {pro.key}
                        showAddToCart={true}
                        product={pro}
                        handleProduct={handleProduct}>
                        </Product>)
                    }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to = '/review'>
                        <button className="buttons">Order Review</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;