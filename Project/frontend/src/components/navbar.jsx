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
  

export const NavBar = () => {

    return(
        <div>
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">BuyFurniture</NavbarBrand>
                <Nav className="mr-auto" navbar>
                 {/* TODO Search Bar. */}
                </Nav>
                <Nav navbar>
                    <NavItem>
                        <NavLink href="#">Cart</NavLink>
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