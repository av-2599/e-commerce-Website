import React from 'react';
import { Input } from 'reactstrap';

import classes from './quantityInput.module.css';

export const QuantityInput = ({ productQuantity, userQuantity, updateUserQuantity }) => {

    const createOptions = () => {
        const optionArray = [];
        for (let i = 0; i < productQuantity; i++)
            optionArray.push(<option>{ i + 1 }</option>);

        return optionArray;
    }

    return(
        <div id={ classes.quantityId }>
            <p>Quantity: </p>
            <Input id={ classes.inputId } type="select" value={ userQuantity } onChange={ e => updateUserQuantity(e.target.value) }>
                { createOptions() }
            </Input>
        </div>
    );
}