export const BACKEND_ADDR = 'http://127.0.0.1:8000';
//export const BACKEND_ADDR = 'https://alpha.tokenstarter.io:543';

export const getFullAPIAddress = url => BACKEND_ADDR + url;

export const STATUS_UPDATE_NEEDED  = '@@status/UPDATE_NEEDED'
export const STATUS_LOADING        = '@@status/LOADING'
export const STATUS_SUCCESS        = '@@status/SUCCESS'
export const STATUS_FAILURE        = '@@status/FAILURE'

