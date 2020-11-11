import React, { useEffect, useState } from 'react';

import { getUserCart, getSpecificProduct } from '../../config/endpoint';
import { ListProduct } from '../../components/list/list';

export const Cart = () => {

    const [cart, setCart] = useState([]);

    useEffect(() => {
        (async () => {
            const productArray = [];
            const { shoppingCart:{ products }} = await getUserCart();
            console.log(products);
            products.forEach(async product => {
                const productData = await getSpecificProduct(product.product);
                productArray.push({ ...productData.product, userQuantity: product.quantity });
            })
            setCart(productArray);
        })();
    }, []);
    
    const createList = () => {
        console.log("Cart:", cart);
        const displayList = [];
        // cart.forEach(product => {
        //     // displayList.push((<ListProduct product={ product } />));
        //     console.log("Product:", product);
        // });
        console.log('TYPE: ' + typeof(cart));
        cart.forEach(product => {
            console.log("PRODUCT:", product);
        })

        console.log(displayList);

        return displayList;
    }

    return(
        <div>
            { createList() }
        </div>
    );
}