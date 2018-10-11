import dateConverter from '../utils/formaters'
import web3utils from 'web3-utils'
import { updateState } from "../utils/updateState";

import * as actions from '../actions/actions'
import * as status from '../config'

const initialState = {
    OptionListInt: [],
    OptionListWeb3: [],
  }


const updateOptionListInt = (state, status, data) => (
    updateState(state, { OptionListInt: {
                                                status: status,
                                                data: data
                                                }
                                            })
)

const updateOptionListWeb3 = (state, status, data) => (
    updateState(state, { OptionListWeb3: {
                                                status: status,
                                                data: data
                                                }
                                            })
)

export default (state=initialState, action) => {

  let updatedWeblist, uid;

  switch(action.type) {

    // Data operations
    case actions.INT_LIST_REQUEST:

        if ((action.error !== undefined) && (action.error) )
            return updateOptionListInt(state, status.STATUS_FAILURE, undefined)

        return updateOptionListInt(state, status.STATUS_LOADING, undefined)

    case actions.INT_LIST_SUCCESS:

        let updatedOptionsList = {};

        for (let item in action.payload) {
                updatedOptionsList[item] = {
                    ...action.payload[item],
                    contract_status: status.STATUS_SUCCESS,
                    data_status: status.STATUS_SUCCESS,
                }

            }
        return updateOptionListInt(state, status.STATUS_SUCCESS, updatedOptionsList)

    case actions.INT_LIST_FAILURE:
        return updateOptionListInt(state, status.STATUS_FAILURE, undefined)


     // Data operations
      case actions.WEB3_LIST_REQUEST:
        uid = action.payload.uid;
        updatedWeblist = Object.assign({}, state.OptionListWeb3.data)
        updatedWeblist[uid] = {
                        ...updatedWeblist[uid],
                        contract_status: status.STATUS_LOADING,
        }

        return updateOptionListWeb3(state, status.STATUS_LOADING, updatedWeblist)

      case actions.WEB3_LIST_SUCCESS:
        uid = action.payload.uid;
        updatedWeblist = Object.assign({}, state.OptionListWeb3.data)
        updatedWeblist[uid] = {
                        ...updatedWeblist[uid],
                        contract_status: status.STATUS_SUCCESS,
                        optionSaleContractAddress: web3utils.toChecksumAddress(action.payload.data[0]),
                        optionTokenContractAddress: web3utils.toChecksumAddress(action.payload.data[1]),
                        tokenContractAddress: web3utils.toChecksumAddress(action.payload.data[2]),

                        optionTokenName: action.payload.data[3],
                        optionTokenSymbol: action.payload.data[4],
                        optionTokenDecimals: action.payload.data[5],
        }

        return updateOptionListWeb3(state, status.STATUS_SUCCESS, updatedWeblist)


    // Data operations
    case actions.WEB3_DATA_REQUEST:
        uid = action.payload.uid;
        updatedWeblist = Object.assign({}, state.OptionListWeb3.data)
        updatedWeblist[uid] = {
                       
                        data_status: status.STATUS_LOADING,
        }

        return updateOptionListWeb3(state, status.STATUS_LOADING, updatedWeblist)

    case actions.WEB3_DATA_SUCCESS:
        uid = action.payload.uid;
        updatedWeblist = Object.assign({}, state.OptionListWeb3.data)
        updatedWeblist[uid] = {
                        ...updatedWeblist[uid],
                        data_status: status.STATUS_SUCCESS,
                        optionPremiumRate: action.payload.data[0].toNumber(),
                        optionStrikePriceRate: action.payload.data[1].toNumber(),
                        optionExpiredAt: dateConverter(action.payload.data[2].toNumber()),
                        salesStartTime: dateConverter(action.payload.data[3].toNumber()),
                        salesFinishTime: dateConverter(action.payload.data[4].toNumber()),
                        salesIsGoing: action.payload.data[5]

        }

        return updateOptionListWeb3(state, status.STATUS_SUCCESS, updatedWeblist)


    case actions.WEB3_OT_BALANCE_SUCCESS:
        uid = action.payload.uid;
        updatedWeblist = Object.assign({}, state.OptionListWeb3.data)
        updatedWeblist[uid] = {
                   ...updatedWeblist[uid],
                   optionBalance: action.payload.data
        }

        return updateOptionListWeb3(state, status.STATUS_SUCCESS, updatedWeblist)

    case actions.WEB3_PT_BALANCE_SUCCESS:
        uid = action.payload.uid;
        updatedWeblist = Object.assign({}, state.OptionListWeb3.data)
        updatedWeblist[uid] = {
                   ...updatedWeblist[uid],
                   projectBalance: action.payload.data
        }

        return updateOptionListWeb3(state, status.STATUS_SUCCESS, updatedWeblist)

    default:
        return state
  }
}

export const getOptionsListInt   = (state) => state.OptionListInt
export const getOptionsListWeb3  = (state) => state.OptionListWeb3