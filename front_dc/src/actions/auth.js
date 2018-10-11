import {RSAA} from 'redux-api-middleware';
import {getFullAPIAddress} from '../config'
import {withAuth} from '../reducers'
import * as actions from './actions'
import {notifyError} from "../utils/updateState";
import { notifyInfo } from "../utils/notification";

export const login = (email, password) => (
    {
        [RSAA]: {
            endpoint: getFullAPIAddress('/api/auth/token/obtain/'),
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'},
            types: [actions.LOGIN_REQUEST, actions.LOGIN_SUCCESS, actions.LOGIN_FAILURE]
        }
    }
)

export const signup = (email, password) => {

     return async (dispatch) => {


        const actionResponse = await dispatch({
           [RSAA]: {
                endpoint: getFullAPIAddress( '/api/auth/signup/' ),
                method: 'POST',
                body: JSON.stringify({email, password}),
                headers: { 'Content-Type': 'application/json' },
                types: [
                    actions.SIGNUP_REQUEST, actions.SIGNUP_SUCCESS, actions.SIGNUP_FAILURE
                ]
      }
        })

        if (actionResponse === undefined) return notifyError("Sign up error")
        // Checking result and notify user
         console.log("ARR", actionResponse)
        if (actionResponse.error !== undefined) {
            const error_message = (actionResponse.payload.response !== undefined) ?
                actionResponse.payload.response.toString() : "Sign up error. Can't connect to server"
             notifyError(error_message)

        } else {
             await dispatch(notifyInfo("You were successfully sign up", "We've send you verification email."))
        }
        return actionResponse
    }

}

export const refreshAccessToken = (token) => ({
    [RSAA]: {
        endpoint: getFullAPIAddress( '/api/auth/token/refresh/' ),
        method: 'POST',
        body: JSON.stringify({refresh: token}),
        headers: { 'Content-Type': 'application/json' },
        types: [
          actions.TOKEN_REQUEST, actions.TOKEN_RECEIVED, actions.TOKEN_FAILURE
        ]
    }
})

export const logout = () => ({
    type: actions.LOGOUT
   
})


export const requestProfile = () => {
    console.log('[API Call]: GetProfile');

    return async (dispatch) => {
        const actionResponse = await dispatch({
            [RSAA]: {
                endpoint: getFullAPIAddress ('/api/account/'),
                method: 'GET',
                headers: withAuth({ 'Content-Type': 'application/json' }),
                types: [ actions.PROFILE_REQUEST, actions.PROFILE_SUCCESS, actions.PROFILE_FAILURE ]
                }
        })

        if (actionResponse === undefined) return notifyError("Cant get action response")
        // Checking result and notify user
        if (actionResponse.error !== undefined) {
            const error_message = (actionResponse.payload.response !== undefined) ?
                actionResponse.payload.response.toString() : "Profile request failed. Can't connect to server"
             notifyError(error_message)
        }

        return actionResponse
    }
}


export const checkVerificationToken = (token) => {
    console.log('[API Call]: Check Verification Token');
    return ({
    [RSAA]: {
        endpoint: getFullAPIAddress ('/api/auth/verify-email/'),
        method: 'POST',
        body: JSON.stringify({token: token}),
        headers: { 'Content-Type': 'application/json' },
        types: [
        actions.VERIFY_EMAIL_REQUEST, actions.VERIFY_EMAIL_SUCCESS, actions.VERIFY_EMAIL_FAILURE
        ]
    }
  });
  }

export const resendVerificationMail = () => {
    console.log('[API Call]: resendVerificationMail');
    return ({
    [RSAA]: {
        endpoint: getFullAPIAddress ('/api/auth/resend/'),
        method: 'POST',
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [
        actions.RESEND_EMAIL_REQUEST, actions.RESEND_EMAIL_SUCCESS, actions.RESEND_EMAIL_FAILURE
        ]
    }
  });
  }



