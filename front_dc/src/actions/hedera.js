import * as actions from "./actions"
import {RSAA} from "redux-api-middleware";

export const getStrategies = () => {
    return ({
        [RSAA]: {
            endpoint: 'http://localhost:5000/get-strategies/',
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            types: [
                actions.GET_STRATEGIES_REQUEST,
                actions.GET_STRATEGIES_SUCCESS,
                actions.GET_STRATEGIES_FAILURE
            ]
        }
    });
};

export const getCase = (role) => {
    return ({
        [RSAA]: {
            endpoint: 'http://localhost:5000/get-case/?role='+role,
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            types: [
                actions.GET_CASE_REQUEST,
                actions.GET_CASE_SUCCESS,
                actions.GET_CASE_FAILURE
            ]
        }
    });
};

export const updateCase = (data, role) => {
    return ({
        [RSAA]: {
            endpoint: 'http://localhost:5000/update-case/?role='+role,
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
            types: [
                actions.UPDATE_CASE_REQUEST,
                actions.UPDATE_CASE_SUCCESS,
                actions.UPDATE_CASE_FAILURE
            ]
        }
    });
};