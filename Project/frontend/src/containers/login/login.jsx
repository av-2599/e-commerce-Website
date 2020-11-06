import React, { useState } from 'react';

import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import classes from './login.module.css';
import { BASE_URL, requestConfig } from '../../config/config';

export const Login = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ validEmail, setValidEmail  ] = useState();
    const [ validPassword, setValidPassword ] = useState();
    
    const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const PWD_REGEX = /^[A-Z][a-z0-9]{6,11}$/;

    const submit = async (e) => {
        e.preventDefault();
        if (!validEmail || !validPassword)
            console.log("Can't submit");
        else
            await auth();
    }

    const onEmailChange = (value) => {
        EMAIL_REGEX.test(value) ? setValidEmail(true) : setValidEmail(false);
        setEmail(value);
    }

    const onPasswordChange = (value) => {
        PWD_REGEX.test(value) ? setValidPassword(true) : setValidPassword(false);
        setPassword(value);
    }

    const auth = async () => {
        const body = {
            user: {
                email,
                password
            }
        };
        const response = await fetch(BASE_URL + '/login', requestConfig('POST', body));
        const data = await response.json();
        // TODO: add request token to request header.
        // TODO: redirect user to homepage.
    }

    return(
        <div className={ classes.login }>
            <div className={ classes.outerCard }>
                <div className={ classes.cardContainer }>
                    <div id={classes.cardId }>
                        <h2>Login</h2>
                        <Form onSubmit={ e => submit(e) }>
                            <FormGroup className={ classes.formFields }>
                                <Label for="exampleEmail"><strong>Email:</strong></Label>
                                <Input
                                    type="email" 
                                    name="email" 
                                    placeholder="example@example.com" 
                                    value={ email }
                                    onChange={ e => onEmailChange(e.target.value) }
                                    valid={ validEmail }
                                    invalid={ !validEmail }
                                />
                            </FormGroup>
                            <FormGroup className={ classes.formFields }>
                                <Label for="examplePassword"><strong>Password:</strong></Label>
                                    <Input
                                        type="password" 
                                        name="password" 
                                        placeholder="password"
                                        value={ password }
                                        onChange={ e => onPasswordChange(e.target.value) } 
                                        valid={ validPassword }
                                        invalid={ !validPassword }
                                    />
                            </FormGroup>
                            <Button outline id={ classes.button }><string>Submit</string></Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};