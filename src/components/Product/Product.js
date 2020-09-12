import React from 'react';
import "./Product.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = (props) => {
    // console.log(props);
    const {name, img, seller, price, stock, key} = props.product;
    return (
        <div className="products">
            <div className="photos">
                <img src={img} alt=''></img>
            </div>
            <div className="details">
                <h4 className="names"><Link to = {'/product/'+ key}>{name}</Link></h4>
                <p><small>sell by: {seller}</small></p>
                <h4>${price}</h4>
                <p><small>Only {stock} left in the stock. Order soon.</small></p>
                {props.showAddToCart && <button
                    className="buttons"
                    onClick={() => props.handleProduct(props.product)}
                    >
                    <FontAwesomeIcon icon={faShoppingBag} />
                     add to cart
                     </button>}
            </div>

        </div>
    );
};

export default Product;