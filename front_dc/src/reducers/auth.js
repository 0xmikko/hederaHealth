import jwtDecode from 'jwt-decode'
import { updateState } from "../utils/updateState";
import * as auth from '../actions/actions'


const initialState = {
  access: undefined,
  refresh: undefined,
  isVerified: undefined,
  errors: {},
  signupSuccess: false
}

export default (state=initialState, action) => {
  console.log('SP#', action)
  switch(action.type) {
    case auth.LOGIN_SUCCESS:
      return updateState({
        access: {
          token: action.payload.access,
          ...jwtDecode(action.payload.access)
        },
        refresh: {
          token: action.payload.refresh,
          ...jwtDecode(action.payload.refresh)
        },
        profile: undefined,
        isVerified: undefined,
        errors: {},
        signupSuccess: false
    })

    case auth.TOKEN_RECEIVED:
      return updateState(state, {
                                    access: {
                                      token: action.payload.access,
                                      ...jwtDecode(action.payload.access)
                                    }
                                  })


    case auth.LOGIN_FAILURE:
    case auth.TOKEN_FAILURE:
    case auth.SIGNUP_FAILURE:

      return {
         access: undefined,
         refresh: undefined,
         profile: undefined,
         isVerified: undefined,
         errors: action.payload.response || {'non_field_errors': action.payload.statusText},
         signupSuccess: false
      }

    case auth.LOGOUT:
      return {
         access: undefined,
         refresh: undefined,
         profile: undefined,
         isVerified: undefined,
         signupSuccess: false
      }

    case auth.PROFILE_SUCCESS:
      return updateState(state, {
                              profile: action.payload,
                              isVerified: action.payload.user.is_verified
                            })

    case auth.PROFILE_FAILURE:
      return updateState(state, {
                             access: undefined,
                              refresh: undefined,
                              profile: undefined,
                              isVerified: undefined,
                              signupSuccess: false

                            })
    case auth.SIGNUP_SUCCESS:
        return updateState(state, {signupSuccess: true})

    case auth.SIGNUP_SUCCESS_RESET:
        return updateState(state, {signupSuccess: false})

      case auth.SIGNUP_IS_CHECKING:
        return updateState(state, {signupSuccess: "loading"})

    default:
      return state
    }
}

export function accessToken(state) {
  if (state.access) {
    return  state.access.token
  }
}

export function isAccessTokenExpired(state) {
  if (state.access && state.access.exp) {
    return 1000 * state.access.exp - (new Date()).getTime() < 5000
  }
  return true
}

export function refreshToken(state) {
  if (state.refresh) {
    return  state.refresh.token
  }
}

export function isRefreshTokenExpired(state) {
  if (state.refresh && state.refresh.exp) {
    return 1000 * state.refresh.exp - (new Date()).getTime() < 5000
  }
  return true
}

export function isAuthenticated(state) {
  return !isRefreshTokenExpired(state)
}

export function errors(state) {
  return  state.errors
}

export const getProfile  = (state) => state.profile;
export const isVerified  = (state) => state.isVerified;
export const refreshTime = (state) => state;
export const signupSuccess = (state) => state.signupSuccess;
