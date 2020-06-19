import * as React from 'react';
import { connect, } from 'react-redux';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import {Button} from "@material-ui/core";
import {bindActionCreators} from "redux";
import {logout} from "../../actions/loginAction";

const NavMenu = (props) => 
{
    let isOpen = false;
    const toggle = () => {
        isOpen = !isOpen;
        console.log(isOpen)
    };
    
    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                <Container>
                    <NavbarBrand tag={Link} to="/">Chatter Site</NavbarBrand>
                    <NavbarToggler onClick={toggle} className="mr-2"/>
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={isOpen} navbar>
                        { props.isLoggedIn &&
                            <Button onClick={props.actions.logout}>Log Out</Button>
                        }
                        <ul className="navbar-nav flex-grow">
                            <NavItem>
                                
                            </NavItem>
                            {
                                !props.isLoggedIn &&
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/login">Login</NavLink>
                                </NavItem>
                            }
                            {
                                props.isLoggedIn &&
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/">{props.username}</NavLink>
                                </NavItem>
                            }                            
                        </ul>
                    </Collapse>
                </Container>
            </Navbar>
        </header>
    )
};

const mapStateToProps = state => {
    return {
        username: state.login.username, 
        isLoggedIn: state.login.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({
            logout,
        },                          dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu)
