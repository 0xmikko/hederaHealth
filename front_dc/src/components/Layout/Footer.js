import React from "react";
import './Footer.css'

const footer = ( props ) => (
        <footer className="footer navbar-fixed-bottom">
            <div className="container">
                <div className="row">
                    <div className="col-xs-6">
                        2018 © Tokenstarter, All rights reserved
                    </div>
                    <div className="col-xs-6">
                        <ul className="pull-right list-inline" >
                            <li className="footertext">
                                <a onClick={() => props.showModal("Welcome")} >About</a>
                            </li>
                            <li>
                                <a onClick={() => props.showModal("Investors")}>Investors</a>
                            </li>
                            <li>
                                <a onClick={() => props.showModal("0_Help")}>Help</a>
                            </li>
                            <li>
                                <a href="http://t.me/tokenstarter" target="_blank" rel="noopener noreferrer">Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>);


export default footer;
