import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import picture from "./../../../public/metamask_kovan.png"
import {connect} from "react-redux";
import * as actions from "../../actions/wallet";
import {airdropMe} from "../../actions/wallet";

class Wallet extends React.Component {

render(){

     let airdrop_me;
     if (this.props.profile.eth_sent === false) {
         airdrop_me =  <Button onClick={() => {this.props.airdropMe(); }}>Airdrop Me</Button>
         }
         else {
         airdrop_me = <p>Oops, you've used your airdrop one-time option</p>
        }

    return <React.Fragment>
        <Modal.Header closeButton>
            <Modal.Title>Getting started: Wallets</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{  backgroundColor: '#121D30'}}>
            <Row>
                <Col sm={12}>

            <h4 className="modal_headers">Starting operations</h4>
            <p>
              For the test period we run our application using Kovan Testnet.
                So to purchase token options and manage your assets, you need some amount of Kovan ETH.
                You could get it from the official&nbsp;
                <a href="https://faucet.kovan.network/">Kovan faucet</a>, or just request our application for 0.1 ETH
                (Gifted ETH will be available on your built-in wallet and could be used for any operations in this application.)
                <br /><br />
                { airdrop_me }
            </p>

            <h4 className="modal_headers">How to use the local and external wallets?</h4>
                <p>
                  This application works with two kind of wallets:
                    built-in wallet which you already have and external <a href={"https://metamask.io/"}>Metamask</a> wallet.
                </p>
                <p>
                    You can use the built-in wallet without Metamask, but if you want to connect your own Metamask wallet,
                    choose the “Switch to Metamask wallet” option in the Account menu.
                    You can switch between wallets at any moment, nevertheless,
                    check if the Metamask network chosen is Kovan Test Network: <br /><br />
                    <img src={picture} width={'60%'} alt={'Illustration'}/>
                </p>

                </Col>
            </Row>
            </Modal.Body>
            <Modal.Footer>
                 <Button onClick={() => this.props.showModal("Marketplace")}>Getting started: Marketplace</Button>
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


export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
