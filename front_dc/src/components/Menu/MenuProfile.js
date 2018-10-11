import React from "react";
import { Link } from "react-router-dom"
import { NavDropdown, MenuItem } from 'react-bootstrap';

import { WALLET_INT, WALLET_WEB3 } from '../../actions/wallet';
import "./Menu.css"

const openLink = (href) => {
          window.open('https://kovan.etherscan.io/address/' + href );
      }

export const MenuProfile = (props) => {

    let walletItems, airdropMe

    // Add wallet dependent items if wallet is connected
    if (props.wallet !== undefined) {
        walletItems = (
            <React.Fragment>

                <MenuItem
                    eventKey={3.2}
                    componentClass={Link}
                    onClick={() => openLink( props.wallet.type === WALLET_INT ? props.wallet.accountInt: props.wallet.accountWeb3)}
                    to = ''
                    >
                    View on Etherscan
                </MenuItem>
                <MenuItem
                    eventKey={3.1}
                    componentClass={Link}
                    onClick={ props.wallet.type === WALLET_WEB3 ? props.switchToIntWallet : props.switchToWeb3Wallet }
                    to = ''
                    >
                    { props.wallet.type === WALLET_WEB3 ? "Switch to built-in wallet" : "Switch to Metamask" }

                </MenuItem>
            </React.Fragment>);
    }

    console.log(props.profile)
    if ((props.wallet !== undefined) && (props.wallet.type === WALLET_INT) && (props.profile.eth_sent == false)) {
        airdropMe = <MenuItem
                    eventKey={3.3}
                    componentClass={Link}
                    onClick={ () => props.showModal('Wallet') }
                    to = ''
                    >
                    Airdrop me!

                </MenuItem>
    }
    return(
        <NavDropdown eventKey={3} title="ACCOUNT" id="basic-nav-dropdown">

            { walletItems }
            { airdropMe }


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
