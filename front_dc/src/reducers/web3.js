
const initialState = {
    web3Instance: null,
    ContractsQty: 0,
}

const web3 = (state = initialState, action) => {
    switch (action.type) {
        case 'WEB3_INITIALIZED':
            return Object.assign({}, state, {
                web3Instance: action.payload.web3Instance
            })
        case '@@FACTORY:QTY':
            return {
                ...state,
                ContractsQty: action.payload.toNumber()
            }
        default:
            return state;
    }
}

export default web3

export const getWeb3Instance = (state) => state.web3Instance
export const getContractsQty = (state) => state.ContractsQty
