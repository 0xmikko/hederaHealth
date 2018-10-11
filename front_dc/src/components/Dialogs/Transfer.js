import React from 'react';
import { connect } from "react-redux";
import { Modal } from 'react-bootstrap'
import { toHumanDate, FormatAddress, rateToPrice } from "../../utils/formaters";

import WalletWidget from '../UI/WalletWidget'
import Calc from "../UI/Calc"
import { WALLET_INT, WALLET_WEB3 } from "../../actions/wallet";

import * as actions from "../../actions/options";

class TransferModal extends React.Component {

  onSubmitHandler = (qty) =>
  {
    if (this.props.wallet.type === WALLET_INT) this.props.onBuyOptionInt(this.props.optionData.optionTokenContractAddress, qty);
    if (this.props.wallet.type === WALLET_WEB3) this.props.onBuyOptionWeb3(
        this.props.web3,
        this.props.optionData.optionTokenContractAddress,
        qty);
    this.props.closeModal();
  }

  render() {

    return (
        <React.Fragment>
            <Modal.Header closeButton style={{margin: 0, padding: 0}}>
                <Modal.Title>Transfer tokens</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               Transfer is under development


            </Modal.Body>
        </React.Fragment>

    );
  }
}


const mapStateToProps = (state) => ({


})


const mapDispatchToProps = dispatch => {
  return {

      onBuyOptionInt:  (eth_token_contract, qty) => dispatch(actions.operationsInt(eth_token_contract, qty, 'execute')),
      onBuyOptionWeb3:  (web3, address, amount) => dispatch(actions.buyOptionsWeb3(web3, address, amount))

  }
};


export default connect(mapStateToProps, mapDispatchToProps)(TransferModal);
