import React, { useState, useEffect } from 'react';

import { getUserCart, getSpecificProduct, updateUserCart } from '../../config/endpoint';
import { List } from '../../components/list/list';
import classes from './cart.module.css';

export const Cart = () => {

    const [cart, setCart] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        (async () => {
            const { shoppingCart:{ products } } = await getUserCart();
            let productArray = await fetchProduct(products);
            format(products, productArray);
            setCart(productArray);
            setReload(false);
        })();
    }, [reload]);

    const fetchProduct = async response => {
        let productArray = [];
        for (let element of response)
            productArray.push(getSpecificProduct(element.product));
        productArray = await Promise.all(productArray);
        return productArray;
    }

    const format = (response, data) => {
        for (let idx in data) {
            let { product } = data[idx];
            let { quantity, cartId } = response[idx];
            data[idx] = {...product, userQuantity: quantity, cartId };
        }
    }

    const updateUserQuantity = async (product, newUserQuantity) => {
        await updateCart(product, newUserQuantity);
        setReload(true);
    }

    const updateCart = async (product, newQuantity) => {
        const data = {
            quantity: newQuantity
        }
        const response = await updateUserCart(product.cartId, data);
    }

    const createList = () => {
        let displayList = [];
        for (let element of cart)
            displayList.push(<List 
                product={ element }
                quantity={ element.userQuantity }
                updateQuantity={ updateUserQuantity }
            />);
        return displayList;
    }

    return(
        <div id={ classes.cartContainer }>
            <div id={ classes.cartList }>
                { createList() }
            </div>
        </div>
    );
}