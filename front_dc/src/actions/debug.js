import * as actions from "./actions";
import {RSAA} from "redux-api-middleware";
import {getFullAPIAddress} from "../config";
import {withAuth} from "../reducers";
import {notifyError} from "../utils/updateState";


export const sendDebugEvent = (event, parameters) => {
    console.log('[API Call]: Send Debug Event');

    parameters = parameters || "";
    return async (dispatch) => {
        const actionResponse = await dispatch({
            [RSAA]: {
                endpoint: getFullAPIAddress('/api/debug/'),
                method: 'POST',
                body: JSON.stringify({event_type: event, parameters: parameters}),
                headers: withAuth({'Content-Type': 'application/json'}),
                types: [actions.SEND_DEBUG_REQUEST, actions.SEND_DEBUG_SUCCESS, actions.SEND_DEBUG_FAILURE]
            }
        })

        if (actionResponse === undefined) return notifyError("Cant get action response")
        // Checking result and notify user
        if (actionResponse.error !== undefined) {
            const error_message = (actionResponse.payload.response !== undefined) ?
                actionResponse.payload.response.toString() : "Send debug info failed. Can't connect to server"
            notifyError(error_message)
        }
        else {
            if ((actionResponse.payload.popup !== undefined) && (actionResponse.payload.popup !== "")) {
                dispatch({
                    type: actions.POPUP,
                    payload: {
                        page: actionResponse.payload.popup
                    }

                })
            }
        }

        return actionResponse
    }
}

export const resetIsPopup = () => {
    return {
        type: actions.POPUP,
        payload: {
            page: undefined
        }
    }

}