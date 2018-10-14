import React from 'react';
import { connect } from "react-redux";
import { Modal } from 'react-bootstrap'
import { toHumanDate, FormatAddress, rateToPrice } from "../../utils/formaters";

import Calc from "../UI/Calc"
import { formatPrice } from "../../utils/formaters";
import * as actions from "../../actions/cases";

class ExecuteModal extends React.Component {

  onSubmitHandler = (qty) =>
  {
    this.props.closeModal();
  }

  render() {

    return (
        <React.Fragment>
            <Modal.Header closeButton style={{margin: 0, padding: 0}}>
                <Modal.Title>Execute Option Contract</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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

     // onBuyOptionInt:  (eth_token_contract, qty) => dispatch(actions.operationsInt(eth_token_contract, qty, 'execute')),
     // onBuyOptionWeb3:  (web3, address, amount) => dispatch(actions.buyOptionsWeb3(web3, address, amount))

  }
};


export default connect(mapStateToProps, mapDispatchToProps)(ExecuteModal);
