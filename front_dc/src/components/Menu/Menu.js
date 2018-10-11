import React from "react";

import {Nav, Navbar} from 'react-bootstrap';

import MenuLeft from "./MenuLeft";
import MenuProfile from "./MenuProfile"

import "./Menu.css"
import Logo from './../../assets/images/logo.png';
import MenuLogin from "./MenuLogin";


export const Menu = (props) => {

    let rightMenu;

    const brandMenu = <Navbar.Header className='navbar_header'>
                        <Navbar.Brand>
                            <img src={Logo} style={{height: '46px'}} />
                        </Navbar.Brand>
                        <Navbar.Toggle />
                      </Navbar.Header>;

    if ((props.isAuthenticated) && (props.profile !== undefined)) {
         rightMenu = <Navbar.Collapse>
                        <Nav pullRight className='navbar_header'>
                            <MenuLeft {...props}/>
                            {/* <Notifications />*/}
                            <MenuProfile {...props} />
                        </Nav>
                     </Navbar.Collapse>
    }
    else
        rightMenu =  <Nav pullRight className='navbar_header'><MenuLogin/></Nav>;

    return <Navbar  collapseOnSelect>

                {brandMenu}
                {rightMenu}

           </Navbar>

}



export default Menu;
