import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from 'reactstrap';

import { removeToken, getToken } from '../../config/token';
import classes from './navbar.module.css';

export const NavBar = () => {
    const history = useHistory();
    /* Breaking Rule for Once. VERY SORRY!!! */
    const [ authOption, setAuthOption ] = useState('Login');

    const onAuth = () => {
        if (!getToken()) {
            setAuthOption('Sign-Out');
            history.push('/login');
        }
        else {
            removeToken();
            setAuthOption('Login');
            history.push('/');
        }
    }

    return(
        <div>
            <Navbar color="dark" dark expand="md" fixed="top">
                <NavbarBrand href="/"><strong>BuyFurniture</strong></NavbarBrand>
                <Nav className="mr-auto" navbar>
                </Nav>
                <Nav navbar>
                    <NavItem>
                        <NavLink href="/add">Add Product</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/cart">Cart</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/orders">Orders</NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>Account</DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>Profile</DropdownItem>
                            <DropdownItem onClick={ () => onAuth() }>
                                { authOption }
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            </Navbar>
        </div>
    );
};