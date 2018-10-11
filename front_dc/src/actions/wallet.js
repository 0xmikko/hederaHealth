import { RSAA } from 'redux-api-middleware';
import { withAuth } from '../reducers'
import { getFullAPIAddress } from '../config'
import * as actions from './actions'
import { transactSuccess, transactError, notifyInfo } from "../utils/notification";
import { requestProfile } from './auth'
export const WALLET_INT =  '@@user/INT_WALLET_CONNECTED';
export const WALLET_WEB3 = '@@user/WEB3_WALLET_CONNECTED';

export const switchToIntWallet = () =>
    {
       return async(dispatch) =>
       {
           await dispatch ({
               [RSAA]: {
                    endpoint: getFullAPIAddress('/api/wallet/'),
                    method: 'GET',
                    headers: withAuth({'Content-Type': 'application/json'}),
                    types: [
                            actions.INT_WALLET_ACCOUNT_REQUEST,
                            actions.INT_WALLET_ACCOUNT_SUCCESS,
                            actions.INT_WALLET_ACCOUNT_FAILURE,
                            ]
                    }
                   })

           return await dispatch({ type: actions.SWITCH_TO_INT_WALLET})
       }
}


export const switchToWeb3Wallet = () => ( {type: actions.SWITCH_TO_WEB3_WALLET} );

export const getAccountWeb3 = (web3) => {
    return dispatch => {
        if ((web3) && (web3.currentProvider)) {
                                         dispatch({
                                            type: actions.WEB3_WALLET_ACCOUNT_UPDATE,
                                            payload: { account: web3.eth.accounts[0]}
                                        })

        }

}
}

export const airdropMe = () =>
    {
       return async(dispatch) =>
       {
           await dispatch(notifyInfo("Your transaction was submitted", "Keep in mind that every transaction takes up to several minutes. " +
                    "You will be noticed when your money will be delivered."))

           const actionResponse = await dispatch ({
               [RSAA]: {
                    endpoint: getFullAPIAddress('/api/account/airdrop_me'),
                    method: 'GET',
                    headers: withAuth({'Content-Type': 'application/json'}),
                    types: [
                            actions.INT_AIRDROP_ME_REQUEST,
                            actions.INT_WALLET_ACCOUNT_SUCCESS,
                            actions.INT_WALLET_ACCOUNT_FAILURE,
                            ]
                    }
                   })

           if (actionResponse.error !== undefined) {
            const error_message = (actionResponse.payload.response !== undefined) ?
                actionResponse.payload.response.toString() : 'Connection server failed'
            return await dispatch(transactError(error_message))
            }

            await requestProfile()
            await dispatch(transactSuccess(actionResponse.payload))

            return actionResponse
       }
}