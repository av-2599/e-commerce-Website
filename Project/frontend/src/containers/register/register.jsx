import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { EMAIL_REGEX, PWD_REGEX, PHONE_REGEX } from '../../config/regex';
import { register, login } from '../../config/endpoint';
import classes from './register.module.css';

export const Register = () => {
    const history = useHistory();
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ validFirstName, setValidFirstName ] = useState(true);
    const [ validLastName, setValidLastName ] = useState(true);
    const [ validEmail, setValidEmail  ] = useState(true);
    const [ validPassword, setValidPassword ] = useState(true);
    const [ validPhone, setValidPhone ] = useState(true);

    const submit = async (e) => {
        e.preventDefault();
        if (!firstName || !lastName || !email || !password || !phone)
            alert('Please fill in all fields to register');
        if (!validFirstName || !validLastName || !validEmail || !validPassword || !validPhone)
            alert("Can't submit. Please check all your fields");
        else {
            const body = {
                user: {
                    firstName,
                    lastName,
                    email,
                    password,
                    phone
                }
            };
            const { status: registerStatus, data: registerData } = await register(body);
            if (registerStatus === 201) {
                const loginBody = {
                    user: {
                        email,
                        password
                    }
                }
                const { status: loginStatus, data: loginData } = await login(loginBody);
                (loginStatus === 200) ? history.push('/') : alert(loginData.error);
            }
            else
                alert("User already exists");
        }
    }

    const onFirstNameChange = (value) => {
        firstName.length < 30 ? setValidFirstName(true) : setValidFirstName(false);
        setFirstName(value);
    }

    const onLastNameChange = (value) => {
        lastName.length < 30 ? setValidLastName(true) : setValidLastName(false);
        setLastName(value);
    }

    const onEmailChange = (value) => {
        EMAIL_REGEX.test(value) ? setValidEmail(true) : setValidEmail(false);
        setEmail(value);
    }

    const onPasswordChange = (value) => {
        PWD_REGEX.test(value) ? setValidPassword(true) : setValidPassword(false);
        setPassword(value);
    }

    const onPhoneChange = (value) => {
        PHONE_REGEX.test(value) ? setValidPhone(true) : setValidPhone(false);
        setPhone(value);
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
                                        value={ firstName }
                                        onChange={ e => onFirstNameChange(e.target.value) }
                                        valid={ !firstName ? null : validFirstName }
                                        invalid={ !firstName ? null : !validFirstName }
                                    />
                                </FormGroup>
                                <FormGroup className={ classes.formFields }>
                                    <Label for="exampleEmail"><strong>Last Name:</strong></Label>
                                    <Input
                                        className={ classes.inputField }
                                        type="text"
                                        name="text"
                                        placeholder="Doe"
                                        value={ lastName }
                                        onChange={ e => onLastNameChange(e.target.value) }
                                        valid={ !lastName ? null : validLastName }
                                        invalid={ !lastName ? null : !validLastName }
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
                                        type="text"
                                        name="text"
                                        placeholder="xxx-xxx-xxxx (10 digits)"
                                        value={ phone }
                                        onChange={ e => onPhoneChange(e.target.value) }
                                        valid={ !phone ? null : validPhone }
                                        invalid={ !phone ? null : !validPhone }
                                    />
                                </FormGroup>
                                <Button outline id={ classes.button }><strong>Register</strong></Button>
                                <br />
                                <div id={ classes.loginLink }>
                                    <Link to="/login">Existing User? Login Here</Link>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
