import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import picture from "./../../../public/money.svg"

export default (props) => (
    <React.Fragment>
        <Modal.Header closeButton>
            <Modal.Title>How Tokenstarter benefits Investors</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col sm={5}>
                    <img src={picture} width={'100%'} alt={'Illustration'}/>
                </Col>
                <Col sm={7}>

            <h4 className={'modal-title'}>Mitigates investors’ risks</h4>
            <p>
             Options allow you to redeem tokens at a specific time and specific price after the token sale if the project produced results and the token price on the exchange increased.
                 <br /><br />
            </p>

            <h4 className={'modal-title'}>Increases ROI of crypto-investments</h4>


                <p>
                  Investing in options yields a higher ROI compared to the traditional token purchase due to the opportunity to buy more tokens for the same amount of money.
                    <br /><br />
                </p>
            <h4 className={'modal-title'}>Motivate startups to focus on token rate</h4>
                <p>
                  cause their further investments depend on token price only. It also motivate startups to provide real evaluation (setting real strike price)
                <br />
                </p>


                </Col>
            </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => props.closeModal()}>Close</Button>
            </Modal.Footer>
    </React.Fragment>);