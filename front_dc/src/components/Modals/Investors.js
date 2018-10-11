import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import picture from "./../../assets/images/gold.jpg"

import "./modals.css"

export default (props) => (
    <React.Fragment>
        <Modal.Header closeButton>
            <Modal.Title>Investors relations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col sm={6} verticalAlign={'center'}>
                    <img src={picture} width={'100%'} alt={'Gold'}/>
                </Col>
                <Col sm={6}>

                    <h4 className="modal_headers" style={{marginTop: '10px'}}>Strategic & sustainable partnership</h4>
                    <p>
                     We are looking for strategic partners who are interesting in investing using our technology.
                    </p>

                    <h4 className="modal_headers">Contact us</h4>
                    <p>
                        Running your own crypto fund? Interested to invest into our platform? <br />
                        Please, contact <a href={"mailto: ir@tokenstarter.io"} style={{color: '#FFFFFF'}}>ir@tokenstarter.io</a>
                    </p>
                </Col>
            </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => props.closeModal()}>Close</Button>
            </Modal.Footer>
    </React.Fragment>);