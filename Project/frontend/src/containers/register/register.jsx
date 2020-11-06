import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { BASE_URL, requestConfig } from '../../config/config';
import { EMAIL_REGEX, PWD_REGEX } from '../../config/regex';
import classes from './register.module.css';

export const Register = () => {
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ validEmail, setValidEmail  ] = useState(true);
    const [ validPassword, setValidPassword ] = useState(true);

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
                firstName,
                lastName,
                email,
                password,
                phone
            }
        };
        const response = await fetch(BASE_URL + '/register', requestConfig('POST', body));
        const data = await response.json();
        // TODO: redirect user to homepage.
        // TODO: validate first name.
        // TODO: validate last name.
        // TODO: validate phone number.
    }

    return(
        <div>
            <div className={ classes.register }>
                <div className={ classes.outerCard }>
                    <div className={ classes.cardContainer }>
                        <div id={ classes.cardId }>
                            <h2>Register</h2>
                            <Form onSubmit={ e => submit(e) }>
                                <FormGroup className={ classes.formFields }>
                                    <Label for="exampleEmail"><strong>First Name:</strong></Label>
                                    <Input
                                        className={ classes.inputField }
                                        type="text" 
                                        name="text" 
                                        placeholder="John"
                                        value= { firstName }
                                        onChange={ e => setFirstName(e.target.value) }
                                    />
                                </FormGroup>
                                <FormGroup className={ classes.formFields }>
                                    <Label for="exampleEmail"><strong>Last Name:</strong></Label>
                                    <Input
                                        className={ classes.inputField }
                                        type="text" 
                                        name="text" 
                                        placeholder="Doe"
                                        value= { lastName }
                                        onChange={ e => setLastName(e.target.value) }
                                    />
                                </FormGroup>
                                <FormGroup className={ classes.formFields }>
                                    <Label for="exampleEmail"><strong>Email:</strong></Label>
                                    <Input
                                        className={ classes.inputField }
                                        type="email" 
                                        name="email" 
                                        placeholder="example@example.com"
                                        value={ email }
                                        onChange={ e => onEmailChange(e.target.value) }
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
                                <FormGroup className={ classes.formFields }>
                                    <Label for="exampleEmail"><strong>Phone:</strong></Label>
                                    <Input
                                        className={ classes.inputField }
                                        type="email" 
                                        name="email" 
                                        placeholder="xxx-xxx-xxxx (10 digits)"
                                        value= { phone }
                                        onChange={ e => setPhone(e.target.value) }
                                    />
                                </FormGroup>
                                <Button outline id={ classes.button }><strong>Register</strong></Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
