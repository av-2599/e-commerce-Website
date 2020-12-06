import React from 'react';
import { Button } from 'reactstrap';

import classes from './list.module.css';
import { QuantityInput } from '../../components/quantityInput/quantityInput';

export const List = ({ product, quantity, isCustomizable, updateQuantity, deleteCartId }) => {

    const updateUserQuantity = newQuantity => {
        updateQuantity(product, newQuantity);
    }

    return(
        <div id={ classes.listContainer }>
            <div id={ classes.box }>
                <h1>{ product.name }</h1>
                <h4>${ product.price }</h4>
                {isCustomizable ? <QuantityInput
                    productQuantity={ product.quantity }
                    userQuantity={ quantity }
                    updateUserQuantity={ updateUserQuantity }
                /> : `Quantity ${ quantity }`}
                { isCustomizable ? <div>
                    <Button outline id={ classes.deleteButton } color='danger' onClick={ () => deleteCartId(product.cartId) } >Delete</Button>
                </div> : '' }
            </div>
        </div>
    );
};
