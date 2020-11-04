import React from 'react';
import { Container } from 'reactstrap';

import { Button, Form, FormGroup, Label, Input, FormText, Card, CardText, CardBody,
    CardTitle, CardSubtitle } from 'reactstrap';

import classes from './login.module.css';

export const Login = () => {

    return(
        <div className={ classes.login }>
            <div className={ classes.outerCard }>
                <div className={ classes.cardContainer }>
                    <Card>
                        <CardBody>
                            <Form>
                                <FormGroup>
                                    <Label for="exampleEmail">Email</Label>
                                    <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="examplePassword">Password</Label>
                                    <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleSelect">Select</Label>
                                    <Input type="select" name="select" id="exampleSelect">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleText">Text Area</Label>
                                    <Input type="textarea" name="text" id="exampleText" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleFile">File</Label>
                                    <Input type="file" name="file" id="exampleFile" />
                                    <FormText color="muted">
                                    This is some placeholder block-level help text for the above input.
                                    It's a bit lighter and easily wraps to a new line.
                                    </FormText>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                    <Input type="checkbox" />{' '}
                                    Check me out
                                    </Label>
                                </FormGroup>
                                <Button>Submit</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
};