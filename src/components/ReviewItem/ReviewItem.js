import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity, key, price} = props.product;
    const reviewItemStyle = {
        borderBottom: "1px solid gray",
        marginBottom: "5px",
        marginLeft: "100px",
        paddingRight:"10px"
    }
    return (
        <div style={reviewItemStyle}>
            <h4 className="names">{name}</h4>
            <p>Quantity: {quantity}</p>
            <p><small>Price: $ {price}</small></p>
            <br/>
            <button
            className= "buttons"
            onClick={() => props.removeProduct(key)}
            >Remove</button>
        </div>
    );
};

export default ReviewItem;