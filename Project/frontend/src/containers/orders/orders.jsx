import React, { useState, useEffect } from 'react';

import { getSpecificProduct, getOrders, updateUserCart } from '../../config/endpoint';
import { List } from '../../components/list/list';
import classes from './orders.module.css';

export const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        (async () => {
            const { status, data: { message: productResponse } } = await getOrders();
            console.log(productResponse);
            const products = await fetchProduct(productResponse);
            format(productResponse, products);
            setOrders(products);
        })();
    }, []);

    const fetchProduct = async response => {
        let productArray = [];
        for (let element of response)
            productArray.push(getSpecificProduct(element.product));
        productArray = await Promise.all(productArray);
        return productArray;
    }

    const format = (response, data) => {
        console.log(data);
        for (let idx in data) {
            let { data:{ product } } = data[idx];
            let { quantity, _id } = response[idx];
            data[idx] = {...product, userQuantity: quantity, _id };
        }
    }

    const createList = () => {
        let displayList = [];
        for (let element of orders)
            displayList.push(<List
                product={ element }
                quantity={ element.userQuantity }
                updateQuantity={ updateUserQuantity }
            />);
        return displayList;
    }

    const updateUserQuantity = async (product, newUserQuantity) => {
        await updateCart(product, newUserQuantity);
    }

    const updateCart = async (product, newQuantity) => {
        const reqData = {
            quantity: newQuantity
        }
        const { status, data } = await updateUserCart(product.cartId, reqData);
    }

    return(
        <div id={ classes.cartContainer }>
            <div id={ classes.cartList }>
                { createList() }
            </div>
        </div>
    );
}