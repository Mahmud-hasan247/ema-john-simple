import React from 'react';
import "./Product.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons'

const Product = (props) => {
    // console.log(props);
    // const {name, img} = props.product;
    return (
        <div className="products">
            <div className="photos">
                <img src={props.img}></img>
            </div>
            <div className="details">
                <h4 className="names">{props.name}</h4>
                <p><small>sell by: {props.seller}</small></p>
                <h4>${props.price}</h4>
                <p><small>Only {props.stock} left in the stock. Order soon.</small></p>
                <button
                    className="buttons"
                    onClick={() => props.handleProduct(props.product)}
                    >
                    <FontAwesomeIcon icon={faShoppingBag} />
                     add to cart
                     </button>
            </div>

        </div>
    );
};

export default Product;