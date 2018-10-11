import * as actionTypes from '../actions/actions';
import { updateState } from "../utils/updateState";
import { WALLET_INT, WALLET_WEB3 } from "../actions/wallet";

const initialState = {
    wallet: {
        accountInt: undefined,
        accountWeb3: undefined,
        type: undefined
        }
};

export default (state=initialState, action) => {

    let updatedWallet;
    switch ( action.type ) {

        case actionTypes.SWITCH_TO_INT_WALLET:
            updatedWallet = updateState(state.wallet, { type: WALLET_INT });
            return updateState(state, { wallet: updatedWallet});

        case actionTypes.SWITCH_TO_WEB3_WALLET:
            updatedWallet = updateState(state.wallet, { type: WALLET_WEB3 });
            return updateState(state, { wallet: updatedWallet });

        case actionTypes.INT_WALLET_ACCOUNT_SUCCESS:
            updatedWallet = updateState(state.wallet, { accountInt: action.payload.address });
            return updateState(state, { wallet: updatedWallet });

        case actionTypes.WEB3_WALLET_ACCOUNT_UPDATE:
            updatedWallet = updateState(state.wallet, { accountWeb3: action.payload.account });
            return updateState(state, { wallet: updatedWallet });

    }

    return state;

};

export const getWallet = state => (state.wallet);