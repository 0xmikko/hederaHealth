import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import picture from "./../../../public/money.svg"

export default (props) => (
    <React.Fragment>
        <Modal.Header closeButton>
            <Modal.Title>Balances</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{  backgroundColor: '#121D30'}}>
            <Row>
                <Col sm={12}>

            <h4 className={'modal-title'}>Build-in wallet</h4>
            <p>
              By default you will start to work with default built-in wallet. All operations will be
            </p>

            <h4 className={'modal-title'}>How to execute option?</h4>


                <p>
                  Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                  dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
                  ac consectetur ac, vestibulum at eros.
                </p>
            <h4 className={'modal-title'}>How to transfer token</h4>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl consectetur
                  et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
                  auctor.
                </p>


                </Col>
            </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => props.closeModal()}>Close</Button>
            </Modal.Footer>
    </React.Fragment>);