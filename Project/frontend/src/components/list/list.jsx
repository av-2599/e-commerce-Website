import React from 'react';

import classes from './list.module.css';
import { QuantityInput } from '../../components/quantityInput/quantityInput';

export const List = ({ product, quantity, updateQuantity }) => {

    const updateUserQuantity = newQuantity => {
        updateQuantity(product, newQuantity);
    }

    return(
        <div id={ classes.listContainer }>
            <div id={ classes.box }>
                <h1>{ product.name }</h1>
                <h4>${ product.price }</h4>
                <QuantityInput
                    productQuantity={ product.quantity }
                    userQuantity={ quantity }
                    updateUserQuantity={ updateUserQuantity }
                />
            </div>
        </div>
    );
};
