import React from 'react';
import { connect } from "react-redux";
import { Modal } from 'react-bootstrap'
import { toHumanDate, FormatAddress, rateToPrice } from "../../utils/formaters";

import WalletWidget from '../UI/WalletWidget'
import Calc from "../UI/Calc"
import { WALLET_INT, WALLET_WEB3 } from "../../actions/wallet";
import { formatPrice } from "../../utils/formaters";
import * as actions from "../../actions/options";

class ExecuteModal extends React.Component {

  onSubmitHandler = (qty) =>
  {
    if (this.props.wallet.type === WALLET_INT) this.props.onBuyOptionInt(this.props.optionData.optionTokenContractAddress,
         parseInt(qty*10**18/this.props.optionData.optionStrikePriceRate));
    if (this.props.wallet.type === WALLET_WEB3) this.props.onBuyOptionWeb3(
        this.props.web3,
        this.props.optionData.optionTokenContractAddress,
        parseInt(qty*10**18/this.props.optionData.optionStrikePriceRate));
    this.props.closeModal();
  }

  render() {

    return (
        <React.Fragment>
            <Modal.Header closeButton style={{margin: 0, padding: 0}}>
                <Modal.Title>Execute Option Contract</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <WalletWidget {...this.props}/><br/>
                Contract:&nbsp;

                <FormatAddress address={this.props.optionData.optionTokenContractAddress} />

                <br />
                Expired at:  {toHumanDate(this.props.optionData.optionExpiredAt)}<br />
                Your balance: {formatPrice(this.props.optionData.optionBalance, 18)} {this.props.optionData.optionTokenSymbol}<br /><br />
                <Calc onSubmitHandler={this.onSubmitHandler}
                    price = {rateToPrice(this.props.optionData.optionStrikePriceRate)}
                    symbol = {this.props.optionData.optionTokenSymbol}
                    operation = "EXECUTE"
                    maxNumber = {formatPrice(this.props.optionData.optionBalance, 18)}
                />

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


export default connect(mapStateToProps, mapDispatchToProps)(ExecuteModal);
