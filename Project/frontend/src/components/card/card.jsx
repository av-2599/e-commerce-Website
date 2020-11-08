import React from 'react';
import { Button, Input } from 'reactstrap';

import classes from './card.module.css';

export const ProductCard = ({ product, addCart, quantity, updateQuantity }) => {

    const createOptions = () => {
        const optionArray = [];
        for (let i = 0; i < product.quantity; i++)
            optionArray.push(<option>{ i + 1 }</option>);

        return optionArray;
    }


    return(
        <div id={ classes.cardId }>
            <h4>{ product.name }</h4>
            <p>${ product.price }</p>
            <div id={ classes.quantityId }>
                <p>Quantity: </p>
                <Input id={ classes.inputId } type="select" value={ quantity } onChange={ (e) => updateQuantity(e.target.value) }>
                    { createOptions() }
                </Input>
            </div>
            <Button outline color="warning" onClick={ e => addCart(product) }>Add to Cart</Button>
            <Button outline color="success">View</Button>
        </div>
    );
}