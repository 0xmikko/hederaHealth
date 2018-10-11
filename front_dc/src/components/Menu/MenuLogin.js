import React from "react";
import { MenuItem } from 'react-bootstrap';


export const MenuLogin = () => {

// If not autherficated of no data about Profile
    // function returns Login button
    return (
        <React.Fragment>
        <MenuItem eventKey={3.1} href='/login/'>
            SIGN IN
        </MenuItem>
         <MenuItem eventKey={3.2} href='/signup/'>
            SIGN UP
        </MenuItem>
        </React.Fragment>
    );
}

export default MenuLogin;