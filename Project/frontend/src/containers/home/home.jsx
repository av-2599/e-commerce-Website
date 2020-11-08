import React, { useState, useEffect } from 'react';

import endpoint from '../../config/endpoint';
import { ProductCard } from '../../components/card/card';
import classes from './home.module.css';

export const Home = () => {
    const [ products, setProducts ] = useState([]);
    const [ userQuantity, setUserQuantity ] = useState(1);
    
    useEffect(() => {
        (async () => {
            const data = await endpoint.getProducts();
            setProducts(data);
        })();
    }, []);

    const createCard = () => {
        let cardArray = [];
        console.log(products);
        products.forEach(product => {
            cardArray.push(<ProductCard 
                key={ product._id }
                product={ product }
                quantity={ userQuantity }
                updateQuantity={ setUserQuantity }
                addCart={ addToCart }
            />);
        });

        return cardArray;
    }

    const addToCart = async (product) => {
        console.log(product);
        console.log(userQuantity);
        const body = {
            cart: {
                product: product._id,
                quantity: userQuantity
            }
        }
        const data = await endpoint.addToCart(body);
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