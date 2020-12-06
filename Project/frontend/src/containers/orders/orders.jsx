import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { getSpecificProduct, getOrders } from '../../config/endpoint';
import { List } from '../../components/list/list';
import classes from './orders.module.css';
import { getToken } from '../../config/token';

export const Orders = () => {
    const history = useHistory();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        (async () => {
            if (!getToken())
                history.push('/login');
            else {
                const { status, data: { message: productResponse } } = await getOrders();
                console.log(productResponse);
                const products = await fetchProduct(productResponse);
                format(productResponse, products);
                setOrders(products);
            }
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
                isCustomizable={ false }
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