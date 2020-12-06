import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';

import { getUserCart, getSpecificProduct, updateUserCart, deleteUserCart, checkout } from '../../config/endpoint';
import { getToken } from '../../config/token';
import { List } from '../../components/list/list';
import classes from './cart.module.css';

export const Cart = () => {
    const history = useHistory();
    const [cart, setCart] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        (async () => {
            if(!getToken())
                history.push('/login');
            else {
                const { status, data: { shoppingCart:{ products: productResponse } }} = await getUserCart();
                const products = await fetchProduct(productResponse);
                format(productResponse, products);
                setCart(products);
                setReload(false);
            }
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
            let { data:{ product } } = data[idx];
            let { quantity, cartId } = response[idx];
            data[idx] = {...product, userQuantity: quantity, cartId };
        }
    }

    const updateUserQuantity = async (product, newUserQuantity) => {
        await updateCart(product, newUserQuantity);
        setReload(true);
    }

    const updateCart = async (product, newQuantity) => {
        const reqData = {
            quantity: newQuantity
        }
        const { status, data } = await updateUserCart(product.cartId, reqData);
    }

    const onCheckout = async () => {
        const { status, data } = await checkout();
        (status === 200) ? history.push('/orders') : console.log(data);
    }

    const onDelete = async (cartId) => {
        const { status, data } = await deleteUserCart(cartId);
        setReload(true);
        console.log(data);
    }

    const createList = () => {
        let displayList = [];
        for (let element of cart)
            displayList.push(<List
                product={ element }
                quantity={ element.userQuantity }
                isCustomizable={ true }
                updateQuantity={ updateUserQuantity }
                deleteCartId={ onDelete }
            />);
        return displayList;
    }

    return(
        <div id={ classes.cartContainer }>
            <div id={ classes.cartList }>
                { createList() }
            </div>
            <div id={ classes.checkout }>
                <div id={ classes.checkoutButton }>
                    <Button outline color="warning" onClick={ e => onCheckout() }>Checkout</Button>
                </div>
            </div>
        </div>
    );
}