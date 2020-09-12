import React, { useState, useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from "../../images/giphy.gif";
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart , setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(prd => prd.key === key);
            product.quantity = savedCart[key]
            return product;
        });
        setCart(cartProducts);
    },[])

    const proceedOrder = () => {
        history.push('/shipment')
    }

    const removeProduct = (productKey) => {
        const newCart = cart.filter(prd => prd.key !== productKey);
        setCart(newCart)
        removeFromDatabaseCart(productKey)
    }

    let thanks;
    if(orderPlaced) {
        thanks = <img src={happyImage} alt=""/>;
    }

    return (
        <div>
            <h2 style={{marginLeft:"50px"}}>Cart Items {cart.length}</h2>
            <div className='twin-container'>
                <div className="product-container">
                {
                    cart.map(prd => <ReviewItem
                    key = {prd.key}
                    removeProduct = {removeProduct}    
                    product={prd}></ReviewItem>)
                }
                {thanks}
                </div>
                <div className="">
                    <Cart cart={cart}>
                        <button onClick={proceedOrder} className="buttons">Proceed Checkout</button>
                    </Cart>
                </div>
            </div>
        </div>
    );
};

export default Review;