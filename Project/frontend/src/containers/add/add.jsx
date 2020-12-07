import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { getToken } from '../../config/token';
import { addProduct } from '../../config/endpoint';
import classes from './add.module.css';

export const Add = () => {
    const history = useHistory();
    const [ productName, setProductName ] = useState('');
    const [ productImage, setProductImage ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ category, setCategory ] = useState('');
    const [ desc, setDesc ] = useState('');
    const [ quantity, setQuantity ] = useState('');
    
    useEffect(() => {
        (async () => {
            if (!getToken())
                history.push('/login');
        })();
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        if (!productName || !productImage || !price || !category || !desc || !quantity)
            alert('Cant submit. Please enter all fields');
        else {
            const body = {
                product: {
                    name: productName,
                    image: productImage,
                    price: price,
                    desc: desc,
                    quantity: quantity
                }
            };
            const { status, data } = await addProduct(body);
            (status === 201) ? history.push('/') : alert(data.error);
        }
    }

    return(
        <div>
            <div className={ classes.register }>
                <div className={ classes.outerCard }>
                    <div className={ classes.cardContainer }>
                        <div id={ classes.cardId }>
                            <h2>Add Product</h2>
                            <Form onSubmit={ e => submit(e) }>
                                <FormGroup className={ classes.formFields }>
                                    <Label for="exampleEmail"><strong>Name:</strong></Label>
                                    <Input
                                        className={ classes.inputField }
                                        type="text"
                                        name="name"
                                        placeholder="Product Name"
                                        value={ productName }
                                        onChange={ (e) => setProductName(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup className={ classes.formFields }>
                                    <Label for="exampleEmail"><strong>Image:</strong></Label>
                                    <Input
                                        className={ classes.inputField }
                                        type="text"
                                        name="image"
                                        placeholder="Enter Image URL"
                                        value={ productImage }
                                        onChange={ (e) => setProductImage(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup className={ classes.formFields }>
                                    <Label for="exampleEmail"><strong>Price:</strong></Label>
                                    <Input
                                        className={ classes.inputField }
                                        type="text"
                                        name="price"
                                        placeholder="Product Price: (Ex: 50)"
                                        value={ price }
                                        onChange={ (e) => setPrice(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup className={ classes.formFields }>
                                    <Label for="examplePassword"><strong>Category:</strong></Label>
                                    <Input
                                        className={ classes.inputField }
                                        type="text"
                                        name="category"
                                        placeholder="Table, Chair, Bed"
                                        value={ category }
                                        onChange={ (e) => setCategory(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup className={ classes.formFields }>
                                    <Label for="examplePassword"><strong>Desc:</strong></Label>
                                    <Input
                                        className={ classes.inputField }
                                        type="text"
                                        name="desc"
                                        placeholder="This is a chair or table"
                                        value={ desc }
                                        onChange={ (e) => setDesc(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup className={ classes.formFields }>
                                    <Label for="exampleEmail"><strong>Quantity:</strong></Label>
                                    <Input
                                        className={ classes.inputField }
                                        type="text"
                                        name="quantity"
                                        placeholder="10, 20, 30"
                                        value={ quantity }
                                        onChange={ (e) => setQuantity(e.target.value)}
                                    />
                                </FormGroup>
                                <Button outline id={ classes.button }><strong>Add Product</strong></Button>
                                <br />
                                <div id={ classes.loginLink }>
                                    <Link to="/">Return to Home</Link>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}