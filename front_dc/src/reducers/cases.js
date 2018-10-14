import dateConverter from '../utils/formaters'
import { updateState } from "../utils/updateState";

import * as actions from '../actions/actions'
import * as status from '../config'

const initialState = {
    CasesList: [],
  }


const updateCasesList = (state, status, data) => (
    updateState(state, { CasesList: {
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
            return updateCasesList(state, status.STATUS_FAILURE, undefined)

        return updateCasesList(state, status.STATUS_LOADING, undefined)

    case actions.INT_LIST_SUCCESS:

        let updatedOptionsList = {};

        for (let item in action.payload) {
                updatedOptionsList[item] = {
                    ...action.payload[item],
                    contract_status: status.STATUS_SUCCESS,
                    data_status: status.STATUS_SUCCESS,
                }

            }
        return updateCasesList(state, status.STATUS_SUCCESS, updatedOptionsList)

    case actions.INT_LIST_FAILURE:
        return updateCasesList(state, status.STATUS_FAILURE, undefined)

    default:
        return state
  }
}

export const getCasesList   = (state) => state.CasesList