import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as notifications} from 'react-notification-system-redux';

import auth, * as fromAuth from './auth'
import debug, * as fromDebug from './debug'
import menu, * as fromMenu from './menu'
import options, * as fromOptions from './options'
import projects, * as fromProjects from './projects'
import wallet, * as fromWallet from './wallet'
import web3, * as fromWeb3 from './web3'

export default combineReducers({
    auth: auth,
    router: routerReducer,
    notifications: notifications,
    debug: debug,
    menu: menu,
    options: options,
    projects: projects,
    wallet: wallet,
    web3: web3,
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


// Options Data
export const getOptionsListWeb3 = state => fromOptions.getOptionsListWeb3(state.options)
export const getOptionsListInt = state => fromOptions.getOptionsListInt(state.options)


// Project Data
export const getProjectData   = state => fromProjects.getProjectData(state.projects)


// Wallet
export const getWallet = state => fromWallet.getWallet(state.wallet)


// Web3
export const getWeb3Instance = state => fromWeb3.getWeb3Instance(state.web3)
export const getContractsQty = state => fromWeb3.getContractsQty(state.web3)


// 
export function withAuth(headers={}) {
  return (state) => ({
    ...headers,
    'Authorization': `Bearer ${accessToken(state)}`
  })
}
