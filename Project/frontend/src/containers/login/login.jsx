import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { EMAIL_REGEX, PWD_REGEX } from '../../config/regex';
import { login, getUser } from '../../config/endpoint';
import classes from './login.module.css';

export const Login = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ validEmail, setValidEmail  ] = useState(true);
    const [ validPassword, setValidPassword ] = useState(true);
    const history = useHistory();
    
    const submit = async (e) => {
        e.preventDefault();
        if (!email || !password)
            alert("Please enter all fields to login");
        if (!validEmail || !validPassword)
            alert("Please verify your fields");
        else {
            const body = {
                user: { 
                    email, 
                    password 
                }
            }
            const { status, data } = await login(body);

            status === 200 ? history.push('/') : alert(data.error);
            console.log(data);
        }
    }

    const checkUser = async() => {
        const body = {
            email
        }

        const { status, data } = await getUser(body);
        if (status === 200)
            setValidEmail(true);
        else {
            alert(data.error);
            setValidEmail(false);
        }
    }

    const onEmailChange = (value) => {
        EMAIL_REGEX.test(value) ? setValidEmail(true) : setValidEmail(false);
        setEmail(value);
    }

    const onPasswordChange = (value) => {
        PWD_REGEX.test(value) ? setValidPassword(true) : setValidPassword(false);
        setPassword(value);
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
                                    className={ classes.inputField }
                                    type="email" 
                                    name="email" 
                                    placeholder="example@example.com" 
                                    value={ email }
                                    onChange={ e => onEmailChange(e.target.value) }
                                    onBlur={ () => checkUser() }
                                    valid={ !email ? null : validEmail }
                                    invalid={ !email ? null : !validEmail }
                                />
                            </FormGroup>
                            <FormGroup className={ classes.formFields }>
                                <Label for="examplePassword"><strong>Password:</strong></Label>
                                <Input
                                    className={ classes.inputField }
                                    type="password" 
                                    name="password" 
                                    placeholder="password"
                                    value={ password }
                                    onChange={ e => onPasswordChange(e.target.value) } 
                                    valid={ !password ? null : validPassword }
                                    invalid={ !password ? null : !validPassword }
                                />
                            </FormGroup>
                            <Button outline id={ classes.button }><strong>Login</strong></Button>
                            <br />
                            <div id={ classes.registerLink }>
                                <Link to="/register">New User? Register Here</Link>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};