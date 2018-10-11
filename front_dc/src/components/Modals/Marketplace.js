import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import picture from "./../../../public/images/Marketplace.png";
import "./modals.css";

export default (props) => (
    <React.Fragment>
        <Modal.Header closeButton>
            <Modal.Title>Marketplace</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col sm={12}>

                    Here you can find a list of token options offered by a number of projects.
                    Every option has their specific:<br /><br />
                     <img src={picture} width={'100%'} alt={'Marketplace view'}/>
                    <br /><br />
                    <i>Premium</i> - price of an option. Premium isn’t refundable and should be paid before the purchase;<br />
                    <i>Stirke Price </i> - price which could be paid till expiration date by investor to realize the option and redeem  the token;<br />
                    <i>Expired At </i> - expiration date of an option contract is the last date when the holder can execute the option according to terms; <br />
                    <i>Crowdsale price </i> - price of a token set during a crowdsale;  <br />
                    <i>Sales dates </i> - period when options are available for sale. <br /><br />
            <h4 className="modal_headers">How to buy token options?</h4>
            <p>
             Choose one from list, get acquainted with the details and make your smart investment by purchasing an option!< br/>
             Keep in mind, that you need at Kovan ETH to buy token options.
                If you haven’t yet them - check <a onClick={() => props.showModal('Wallet')} >Wallet</a> to ask for airdrop!).

            </p>


                </Col>
            </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => props.closeModal()}>Close</Button>
            </Modal.Footer>
    </React.Fragment>);