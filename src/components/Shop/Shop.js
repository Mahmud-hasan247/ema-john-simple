import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';

const Shop = () => {
    const first20 = fakeData.slice(10, 20);
    const [products, setProducts] = useState(first20)
    const [cart, setCart] = useState([]);

    const handleProduct = (product) => {
        console.log("Product added", product);
        const newCart = [...cart, product];
        setCart(newCart);
    

    }
    return (
        <div className= "shop-container">
            <div className="product-container">
                    {
                        products.map(pro => 
                        <Product 
                        product={pro}
                        img={pro.img}
                        name={pro.name} seller={pro.seller}
                        price={pro.price}
                        stock={pro.stock}
                        handleProduct={handleProduct}>
                        </Product>)
                    }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;