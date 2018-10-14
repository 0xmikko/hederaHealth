import React from "react";
import { NavDropdown, MenuItem } from 'react-bootstrap';

import "./Menu.css"


export const MenuProfile = (props) => {


    return(
        <NavDropdown eventKey={3} title="ACCOUNT" id="basic-nav-dropdown">

            <MenuItem
                eventKey={3.5}
                onClick={() => props.showModal("InteractiveHelp")}
                >Get Help</MenuItem>

            <MenuItem
                eventKey={3.4}
                onClick={() => props.showModal("Welcome")}
                >Quick tour</MenuItem>

            <MenuItem divider />

            <MenuItem eventKey={3.6} onClick={props.onLogout}>
                <i className="md md-settings-power"></i> Logout
            </MenuItem>

        </NavDropdown>);


}


export default MenuProfile;

