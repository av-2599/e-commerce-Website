import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';

import { QuantityInput } from '../../components/quantityInput/quantityInput';
import { getSpecificProduct, addToCart } from '../../config/endpoint';
import classes from './product.module.css';

export const Product = () => {
    const history = useHistory();
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [userQuantity, setUserQuantity] = useState(1);

    useEffect(() => {
        (async () => {
            const { data: { product } } = await getSpecificProduct(productId);
            setProduct(product);
        })();
    }, [productId]);

    const addCart = async () => {
        const body = {
            cart: {
                product: product._id,
                quantity: userQuantity
            }
        }
        const { status, data } = await addToCart(body);
        if (status === 201)
            alert("Item added to cart");
        else
            history.push('/login');
        console.log(data);
    }

    return(
        <div id={ classes.productContainer }>
            <div id={ classes.innerDivId }>
                <h1>{ product.name }</h1>
                <img src={ product.image } alt='Product Image' />
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