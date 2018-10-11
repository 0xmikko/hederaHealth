import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';

export default (props) => (
    <React.Fragment>
        <Modal.Header closeButton>
            <Modal.Title>Welcome to Tokenstarter Tour</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row  style={{minHeight: "70%"}} >
                <Col sm={12}>



            <h3 className="modal_headers" style={{marginTop: '10px'}}>Reduce Risk and Increase ROI for Your Crypto Investments</h3>


            <h4 className={'modal-title'}>What is Tokenstarter?</h4>
                    We offer a win-win solution that increases ROI and mitigates risks of investments in crypto assets for investors along with helping startups to raise more money and emphasize the seriousness of their intentions.
            <br /><br />

            <h4 className={'modal-title'}>How Tokenstarter benefits crypto investors?</h4>
            <br />

            <ul>
              <li>
                <strong>Mitigates investors’ risks</strong>
                <p>
                    Options allow you to redeem tokens at a specific time and specific price after the token sale if the project produced results and the token price on the exchange increased.
                    <br />
                </p>
              </li>
              <li>
                <strong>Increases ROI of crypto-investments</strong>
                <p>
                    Investing in options yields a higher ROI compared to the traditional token purchase due to the opportunity to buy more tokens for the same amount of money.
                    <br />
                </p>
              </li>
              <li>
                <strong>Motivate startups to focus on token rate</strong>
                <p>
                    cause their further investments depend on token price only. It also motivate startups to provide real evaluation (setting real strike price)
                    <br />
                </p>
              </li>

            </ul>
         <h4 className="modal_headers">Take 5 minutes tour to learn how to earn more with crypto options!</h4>

                </Col>
            </Row>
            </Modal.Body>
            <Modal.Footer>
                <Row>
                <Button onClick={() => props.showModal("Wallet")}>Getting started: Wallets</Button>
                </Row>
            </Modal.Footer>
    </React.Fragment>);