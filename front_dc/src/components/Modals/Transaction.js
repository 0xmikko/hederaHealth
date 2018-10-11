import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import picture from "./../../../public/money.svg"

export default (props) => (
    <React.Fragment>
        <Modal.Header closeButton>
            <Modal.Title>Your Transaction was submitted</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{  backgroundColor: '#121D30'}}>
            <Row>
                <Col sm={12}>
                Well done! But keep in mind that every transaction takes few minutes.
                You will be noticed when your transaction would be mined.


                </Col>
            </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => props.closeModal()}>Close</Button>
            </Modal.Footer>
    </React.Fragment>);