import React from 'react';

export const Price = ({ products }) => {

    const calculateTotal = () => {
        let totalPrice = 0;
        for (let product of products)
            totalPrice += product.price * product.quantity;
        return totalPrice;
    }

    return(
        <div>
            <h3>Total Price: ${ calculateTotal() }</h3>
        </div>
    );
}