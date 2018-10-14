import { RSAA } from 'redux-api-middleware';
import { withAuth } from '../reducers'
import { getFullAPIAddress } from '../config'
import { error, success } from 'react-notification-system-redux';
import {transactSuccess, transactError, notifyInfo} from "../utils/notification";
import * as actions from "./actions"

export const getCasesList = () => {
  console.log('[API Call]: GetOptionsList');
  return ({
  [RSAA]: {
      endpoint: getFullAPIAddress( '/api/cases/' ),
      method: 'GET',
      headers: withAuth({ 'Content-Type': 'application/json' }),
      types: [
        actions.INT_LIST_REQUEST, actions.INT_LIST_SUCCESS, actions.INT_LIST_FAILURE
      ]
  }
});
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

