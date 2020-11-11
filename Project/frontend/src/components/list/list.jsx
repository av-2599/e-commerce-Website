import React from 'react';

import classes from './list.module.css';

export const ListProduct = ({ product }) => {
    console.log(product);
    return (
        <div id={ classes.listContainer }>
            <div>
                <h6>{ product.name }</h6>
                <h6>{ product.quantity }</h6>
                <h6>{ product.userQuantity }</h6>
            </div>
        </div>
    )
}