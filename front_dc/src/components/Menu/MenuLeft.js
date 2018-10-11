import React from "react";
import {Link} from "react-router-dom"
import { Nav, NavItem } from 'react-bootstrap';


export const MenuLeft = () => {

    const menuItems = [
        {
            label: 'MARKETPLACE',
            href: 'options',
        },

        {
            label: 'EXCHANGE',
            href: 'exchange',
        },

        {
            label: 'BALANCES',
            href: 'balances',
        },

    ];

    return (<Nav>
        {menuItems.map(m => (
            <NavItem key={'menu' + m.href}
                     componentClass={Link}
                     href={'/' + m.href + '/'}
                     to={'/' + m.href + '/'}
                     className='nav-item'
            >
                {m.label}
            </NavItem>))}

    </Nav>)

}


export default MenuLeft;
