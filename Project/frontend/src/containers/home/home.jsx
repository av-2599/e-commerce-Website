import React, { useState, useEffect } from 'react';

import { getProducts, addToCart } from '../../config/endpoint';
import { ProductCard } from '../../components/card/card';
import classes from './home.module.css';

export const Home = () => {
    const [ products, setProducts ] = useState([]);
    const [ userQuantity, setUserQuantity ] = useState(1);
    
    useEffect(() => {
        (async () => {
            const data = await getProducts();
            setProducts(data);
        })();
    }, []);

    const createCard = () => {
        let cardArray = [];
        products.forEach(product => {
            cardArray.push(<ProductCard 
                key={ product._id }
                product={ product }
                quantity={ userQuantity }
                updateQuantity={ setUserQuantity }
                addCart={ addCart }
            />);
        });
        return cardArray;
    }

    const addCart = async (product) => {
        const body = {
            cart: {
                product: product._id,
                quantity: userQuantity
            }
        }
        const data = await addToCart(body);
        console.log(data);
    }

    return(
        <div>
            <div id={ classes.homeDiv }>
                { createCard() }
            </div>
        </div>
    );
}