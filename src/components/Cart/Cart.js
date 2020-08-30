import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    const total = cart.reduce((total, prd) => total + prd.price , 0);

    // let total = 0;
    // for (let i = 0; i < cart.length; i++) {
    //     const product = cart[i];
    //     total = total + product.price;
    // }
    let shipping = 0;
    if (total > 50){
        shipping = 0;
    }
    else if(total > 30) {
        shipping = 5.5;
    }
    else if (total > 0) {
        shipping = 10;
    }
    const vat = parseFloat((total / 20).toFixed(2));
    return (
        <div>
            <h3>Order Summary</h3>
            <h5>Items Ordered: {cart.length}</h5>
            <p>Product-price: {total}</p>
            <p>Shipping-Cost: {shipping}</p>
            <p>Tax + Vat: {vat}</p>
            <p>Total Price: {total + shipping + vat}</p>
        </div>
    );
};

export default Cart;