import React from 'react';
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

import classes from './navbar.module.css';

export const NavBar = () => {

    return(
        <div>
            <Navbar color="dark" dark expand="md" fixed="top">
                <NavbarBrand href="/"><strong>BuyFurniture</strong></NavbarBrand>
                <Nav className="mr-auto" navbar>
                </Nav>
                <Nav navbar>
                    <NavItem>
                        <NavLink href="/cart">Cart</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/orders">Orders</NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                        Account
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>
                            Profile
                            </DropdownItem>
                            <DropdownItem>
                            Sign In
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            </Navbar>
        </div>
    );
};