import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';

const Shop = () => {
    // const first20 = fakeData.slice(10, 30);
    const [products, setProducts] = useState(fakeData)
    return (
        <div className= "shop-container">
            <div className="product-container">
                    {
                        products.map(product => <Product product={product.name}></Product>)
                    }
            </div>
            <div className="cart-container">
                <h1>cart-container</h1>
            </div>
        </div>
    );
};

export default Shop;