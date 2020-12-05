import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import { QuantityInput } from '../quantityInput/quantityInput';
import classes from './card.module.css';

export const ProductCard = ({ product, addCart, quantity, updateQuantity }) => {

    return(
        <div id={ classes.cardId }>
            <h4>{ product.name }</h4>
            <p>${ product.price }</p>
            <QuantityInput
                productQuantity={ product.quantity }
                userQuantity={ quantity }
                updateUserQuantity={ updateQuantity }
            />
            <Button outline color="warning" onClick={ e => addCart(product) }>Add to Cart</Button>
            <div id={ classes.viewId }>
                <Link to={ `/${ product._id }`}>
                    <Button outline color="success">View</Button>
                </Link>
            </div>
        </div>
    );
}
