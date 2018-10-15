import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as notifications} from 'react-notification-system-redux';

import auth, * as fromAuth from './auth'
import debug, * as fromDebug from './debug'
import menu, * as fromMenu from './menu'
import cases, * as fromCases from './cases'

import hedera, * as fromHedera from './hedera'

export default combineReducers({
    auth: auth,
    router: routerReducer,
    notifications: notifications,
    debug: debug,
    menu: menu,
    cases: cases,
    hedera: hedera
})

// Authenfication
export const isAuthenticated = state => fromAuth.isAuthenticated(state.auth)
export const accessToken = state => fromAuth.accessToken(state.auth)
export const isAccessTokenExpired = state => fromAuth.isAccessTokenExpired(state.auth)
export const refreshToken = state => fromAuth.refreshToken(state.auth)
export const isRefreshTokenExpired = state => fromAuth.isRefreshTokenExpired(state.auth)
export const authErrors = state => fromAuth.errors(state.auth)
export const getProfile = state => fromAuth.getProfile(state.auth)
export const isVerified = state => fromAuth.isVerified(state.auth)
export const refreshTime = state => fromAuth.refreshTime(state.auth)
export const signupSuccess = state => fromAuth.signupSuccess(state.auth)

// Debug
export const isPopup = state => fromDebug.isPopup(state.debug)

// Menu
export const getMenuItem = state => fromMenu.getMenuItem(state.menu)


// Cases
export const getCasesList = state => fromCases.getCasesList(state.cases)

// With Auth short
export function withAuth(headers={}) {
  return (state) => ({
    ...headers,
    'Authorization': `Bearer ${accessToken(state)}`
  })
}
