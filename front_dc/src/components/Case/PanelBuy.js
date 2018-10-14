import React from 'react';
import { connect } from 'react-redux';

import DataPanel from '../UI/DataPanel';
import Calc from '../UI/Calc';
import { rateToPrice } from "../../utils/formaters";
import * as actions from '../../actions/cases'
import {WALLET_INT, WALLET_WEB3} from "../../actions/wallet";

class PanelBuy extends React.Component
{

  state = {
    qty: '0',
    total: 0,
    disabled: true
  }

  onSubmitHandler = (qty) =>
  {
    if (this.props.wallet.type === WALLET_INT) this.props.onBuyOptionInt(this.props.optionData.optionTokenContractAddress,
                    parseInt(qty*10**18/this.props.optionData.optionPremiumRate));
    if (this.props.wallet.type === WALLET_WEB3) this.props.onBuyOptionWeb3(
        this.props.web3,
        this.props.optionData.optionSaleContractAddress,
        parseInt(qty*10**18/this.props.optionData.optionPremiumRate));
  }

  render()
  {

    return <DataPanel header='Buy'>
                    <WalletWidget {...this.props}/>
                    <br />
                    Contract: {this.props.optionData.optionSaleContractAddress}
                    <br /><br />
                    <Calc
                        onSubmitHandler={this.onSubmitHandler}
                        price = {rateToPrice(this.props.optionData.optionPremiumRate, 18)}
                        symbol = {this.props.optionData.optionTokenSymbol}
                        operation = "BUY"
                    />
              </DataPanel>
          

}
}


const mapStateToProps = (state) => ({


})


const mapDispatchToProps = dispatch => {
  return {

      onBuyOptionInt:  (eth_token_contract, qty) => dispatch(actions.operationsInt(eth_token_contract, qty, 'buy')),
      onBuyOptionWeb3:  (web3, address, amount) => dispatch(actions.buyOptionsWeb3(web3, address, amount))

  }
};


export default connect(mapStateToProps, mapDispatchToProps)(PanelBuy);
