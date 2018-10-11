import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import "./modals.css"

export default (props) => (
    <React.Fragment>
        <Modal.Header closeButton>
            <Modal.Title>Option Page</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
            <Col>
            <h4 className="modal_headers">How to buy token options?</h4>
            <p>
                If you are confident about the offer you can buy an option in the bottom of the page and go ahead make smart investments with Tokenstarter!
            </p>
            <h4 className="modal_headers">How to analyze projects?</h4>
            <p>
                You are so close to buy your first token option. Nevertheless, don’t be in a hurry to make investments.
                Read suggested information carefully and check all the details.
                If you’re not sure, maybe it’s better to come back to the marketplace and choose another project.
                Here you can find a list of token options offered by a number of projects.
            </p>
            </Col>
            </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => props.closeModal()}>Close</Button>
            </Modal.Footer>
    </React.Fragment>);