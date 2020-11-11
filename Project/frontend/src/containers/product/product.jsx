import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'reactstrap';

import { QuantityInput } from '../../components/quantityInput/quantityInput';
import { getSpecificProduct, addToCart } from '../../config/endpoint';
import classes from './product.module.css';

export const Product = () => {
    
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [userQuantity, setUserQuantity] = useState(1);

    useEffect(() => {
        (async () => {
            const { product } = await getSpecificProduct(productId);
            setProduct(product);
        })();
    }, []);

    const addCart = async () => {
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
        <div id={ classes.productContainer }>
            <div id={ classes.innerDivId }>
                <h1>{ product.name }</h1>
                <h2>{ product.price }</h2>
                <h3>{ product.desc }</h3>
                <QuantityInput
                    productQuantity={ product.quantity }
                    userQuantity={ userQuantity }
                    updateUserQuantity={ setUserQuantity }
                />
                <Button outline color="warning" onClick={ e => addCart() }>
                    Add to Cart
                </Button>
            </div>
        </div>
    );
}