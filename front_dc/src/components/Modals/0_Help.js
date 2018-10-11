import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default (props) => (
    <React.Fragment>
        <Modal.Header closeButton>
            <Modal.Title>Tokenstarter Help Pages</Modal.Title>
        </Modal.Header>
        <Modal.Body>

                <ul>
                    <ol><a onClick={() => props.showModal("Wallet")}>Welcome</a></ol>
                    <ol><a onClick={() => props.showModal("Benefits")}>Benefits for investors</a></ol>
                    <h5 className={'modal-title'}>How to</h5>
                    <ol><a onClick={() => props.showModal("Wallet")}>How to buy token options?</a></ol>
                    <ol><a onClick={() => props.showModal("Wallet")}>How to execute token options?</a></ol>
                    <ol><a onClick={() => props.showModal("Wallet")}>How to sell token onptions</a></ol>
                    <ol><a onClick={() => props.showModal("Wallet")}>Using built-in and Metamask wallets</a></ol>
                    <ol><a onClick={() => props.showModal("Wallet")}>Demonstration game rules</a></ol>
                </ul>


            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => props.closeModal()}>Close</Button>
            </Modal.Footer>
    </React.Fragment>);