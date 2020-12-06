import React, { useState, useEffect } from 'react';
import { Form, Input, Button, ButtonGroup } from 'reactstrap';

import { getProducts, addToCart, searchProduct } from '../../config/endpoint';
import { ProductCard } from '../../components/card/card';
import classes from './home.module.css';

export const Home = () => {
    const [ products, setProducts ] = useState([]);
    const [ userQuantity, setUserQuantity ] = useState(1);
    const [ searchInput, setSearchInput ] = useState('');
    const [ filter, setFilter ] = useState(null);
    
    useEffect(() => {
        (async () => {
            const { status, data } = await getProducts();
            setProducts(data);
        })();
    }, []);

    const createCard = () => {
        let cardArray = [];
        for (let product of products) {
            cardArray.push(<ProductCard 
                key={ product._id }
                product={ product }
                quantity={ userQuantity }
                updateQuantity={ setUserQuantity }
                addCart={ addCart }
            />);
        }
        return cardArray;
    }

    const addCart = async (product) => {
        const body = {
            cart: {
                product: product._id,
                quantity: userQuantity
            }
        }
        const { status, data } = await addToCart(body);
    }
    
    const onSearch = async (e) => {
        e.preventDefault();
        const body = {
            name: searchInput
        }
        const { status, data: { message } } = await searchProduct(body);
        setProducts(message);
    }

    const orderProducts = (type) => {
        setFilter(type);
        setProducts(products.sort( compare ));
    }
    
    const compare = (a, b) => {
        if (filter === 'L') {
            if (a.price < b.price)
                return 1;
            else if (a.price === b.price)
                return 0;
            else
                return -1;
        }
        else {
            if (a.price < b.price)
                return -1;
            else if (a.price === b.price)
                return 0;
            else
                return 1;
        }
    }

    return(
        <div id={ classes.homeDiv }>
            <div id={ classes.searchBar }>
                <Form id={ classes.searchForm } onSubmit={ (e) => onSearch(e) }>
                    <Input
                        value={ searchInput }
                        onChange={ e => setSearchInput(e.target.value) } 
                        id={ classes.inputField } 
                        placeholder='Search Product Name'
                    />
                    <Button outline type="submit" id={ classes.button }><strong>Search</strong></Button>
                </Form>
                <ButtonGroup>
                    <Button color="primary" onClick={() => orderProducts('L')} active={filter === 'L'}>Low to High</Button>
                    <Button color="primary" onClick={() => orderProducts('H')} active={filter === 'H'}>High to Low</Button>
                </ButtonGroup>
            </div>
            { createCard() }
        </div>
    );
}