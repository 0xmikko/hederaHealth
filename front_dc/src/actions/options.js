import { RSAA } from 'redux-api-middleware';
import { withAuth } from '../reducers'
import { getFullAPIAddress } from '../config'
import { factoryAddress } from './../../config/factory'
import { error, success } from 'react-notification-system-redux';
import {transactSuccess, transactError, notifyInfo} from "../utils/notification";
import * as actions from "./actions"

// Import contracts
import OptionFactoryArtifact from "./../../contracts/OptionFactory.sol";
import OptionSaleArtifact from "./../../contracts/OptionSale.sol";
import OptionTokenArtifact from "./../../contracts/OptionToken.sol";
import ERC20Artifact from "openzeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol";



export const getOptionsListInt = () => {
  console.log('[API Call]: GetOptionsList');
  return ({
  [RSAA]: {
      endpoint: getFullAPIAddress( '/api/options/' ),
      method: 'GET',
      headers: withAuth({ 'Content-Type': 'application/json' }),
      types: [
        actions.INT_LIST_REQUEST, actions.INT_LIST_SUCCESS, actions.INT_LIST_FAILURE
      ]
  }
});
}




export const getOptionsListWeb3 = (web3, balances) => {
    let result;

    return async (dispatch) => {

        if ((web3) && (web3.currentProvider)) {

            const wallet = web3.eth.coinbase;
            let balance;

            const contract = require('truffle-contract')
            const OptionFactory = contract(OptionFactoryArtifact);
            OptionFactory.setProvider(web3.currentProvider);
            const OptionToken = contract(OptionTokenArtifact);
            OptionToken.setProvider(web3.currentProvider);
            const ERC20 = contract(ERC20Artifact);
            ERC20.setProvider(web3.currentProvider);

            await dispatch(notifyInfo("Your transaction was submitted", "Keep in mind that every transaction takes up to several minutes. " +
            "You will be noticed when it'll be mined."))

            let instanceOptionFactory = await OptionFactory.at(factoryAddress);

            let contractsQty = await instanceOptionFactory.getContractsQty();
            await dispatch({
                type: actions.WEB3_CONTRACT_QTY,
                payload: {
                    data: contractsQty.toNumber()
                }
            })

            if (contractsQty !== undefined) {

                for (let i = 0; i < contractsQty.toNumber(); i++) {
                    dispatch({
                        type: actions.WEB3_LIST_REQUEST,
                        payload: {
                            uid: i,
                            data: contractsQty
                        }

                    })
                    result = await instanceOptionFactory.getOptionParameters(i)
                    dispatch({
                        type: actions.WEB3_DATA_SUCCESS,
                        payload: {
                            uid: i,
                            data: result
                        },
                    })

                    result = await instanceOptionFactory.getContractsInfo(i)
                    dispatch({
                        type: actions.WEB3_LIST_SUCCESS,
                        payload: {
                            uid: i,
                            data: result
                        },
                    })
                    let optionTokenContractAddress = result[1];
                    let projectTokenContractAddress = result[2];

                    if (balances) {
                        let optionTokenInstance = await OptionToken.at(optionTokenContractAddress)
                        balance = await optionTokenInstance.balanceOf(wallet)
                        dispatch({
                            type: actions.WEB3_OT_BALANCE_SUCCESS,
                            payload: {
                                uid: i,
                                data: balance.toNumber()
                            },
                        })

                        let projectTokenInstance = await ERC20.at(projectTokenContractAddress)
                        balance = await projectTokenInstance.balanceOf(wallet)
                        dispatch({
                            type: actions.WEB3_PT_BALANCE_SUCCESS,
                            payload: {
                                uid: i,
                                data: balance.toNumber()
                            },
                        })


                    }


                }
            }
        }
    }
}


export const operationsInt = (address, amount, operation) => {

    if ((operation !== 'buy') && (operation !== 'execute')) return false;

    return async (dispatch) => {
        await dispatch(notifyInfo("Your transaction was submitted", "Keep in mind that every transaction takes up to several minutes. " +
        "You will be noticed when it'll be mined."))

        const actionResponse = await dispatch({
            [RSAA]: {
                endpoint: getFullAPIAddress('/api/options/' + operation + '/'),
                method: 'POST',
                headers: withAuth({'Content-Type': 'application/json'}),
                body: JSON.stringify({optionTokenContractAddress: address, amount: amount}),
                types: [ actions.INT_BUY_REQUEST, actions.INT_BUY_SUCCESS, actions.INT_BUY_FAILURE ]
                }})

        // Checking result and notify user
        if (actionResponse.error !== undefined) {
            const error_message = (actionResponse.payload.response !== undefined) ?
                actionResponse.payload.response.toString() : 'Connection server failed'
            return await dispatch(transactError(error_message))
        }

        await dispatch(operation.toString().toUpperCase(), amount);
        await dispatch(transactSuccess(actionResponse.payload))

        return actionResponse
    }

}

export const buyOptionsWeb3 = (web3, address, amount) => {

    let result;

    return async (dispatch) => {
        if ((web3) && (web3.currentProvider)) {

            await dispatch(notifyInfo("Your transaction was submitted", "Keep in mind that every transaction takes up to several minutes. " +
            "You will be noticed when it'll be mined."))

            const contract = require('truffle-contract')
            const OptionSale = contract(OptionSaleArtifact);
            OptionSale.setProvider(web3.currentProvider);

            let instanceOptionSale = OptionSale.at(address)

            // Check that sales is on going
            result = await instanceOptionSale.getSalesParameters.call()
            if (!result[2]) { return dispatch(error({title: "Transaction error", message: 'Unfortunately sales is not avaible now'})) }

            result = await instanceOptionSale.sendTransaction({
                from: web3.eth.coinbase,
                value: amount
            })

            await dispatch("BUY", amount);
            if (result.receipt === undefined) return await transactError('Transaction was rejected')
            return await dispatch(transactSuccess(result.receipt))

        }
    }
}

