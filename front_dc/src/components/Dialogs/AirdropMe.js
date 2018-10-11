import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import picture from "./../../../public/money.svg"
import * as actions from "../../actions/wallet";
import {connect} from "react-redux";

class AirdropMe extends React.Component {

    render(){
        return <React.Fragment>
                    <Modal.Header closeButton>
                        <Modal.Title>Airdrop & internal wallet</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: '#121D30'}}>
                        <Row>
                            <Col sm={5}>
                                <img src={picture} width={'100%'} alt={'Illustration'}/>

                            </Col>
                            <Col sm={1} />
                            <Col sm={6}>

                        <h4>Build-in wallet</h4>
                        <p>
                         We assume that you as many our customers has no Kovan Eth to buy token options. Good news, we could deliver you
                            0.1ETH for free. This is one-time action.
                        </p>
                        <p>
                          Gifted ETH will be avaible on your built-in wallet. It could be used for any operations in this application.
                        </p>
                         <Button onClick={this.props.airdropMe}>Airdrop Me!</Button>

                            </Col>
                        </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => this.props.closeModal()}>Close</Button>
                        </Modal.Footer>
                </React.Fragment>
    }
}


const mapStateToProps = (state) => ({


})


const mapDispatchToProps = dispatch => {
  return {

      airdropMe:  () => dispatch(actions.airdropMe()),

  }
};


export default connect(mapStateToProps, mapDispatchToProps)(AirdropMe);