import { combineReducers } from 'redux'

import hedera, * as fromHedera from './hedera'

export default combineReducers({
    hedera: hedera
})