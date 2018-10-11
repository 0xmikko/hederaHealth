import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';

export default (props) => (
    <React.Fragment>
        <Modal.Header closeButton>
            <Modal.Title>Exchange</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col sm={6}>

                </Col>
                <Col sm={6}>

            <h4>Build-in wallet</h4>
            <p>
              By default you will start to work with default built-in wallet. All operations will be
            </p>

            <h4>Connecting Metamask</h4>


                <p>
                 Trading options has its own nuances and to figure out which features are needed and market fit, the Tokenstarter Option Exchange will be developed by modifying Etherdelta code. The Option Exchange will be integrated with core system by token option smart contract. Exchange automatically controls
                </p>

                </Col>
            </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => props.closeModal()}>Close</Button>
            </Modal.Footer>
    </React.Fragment>);