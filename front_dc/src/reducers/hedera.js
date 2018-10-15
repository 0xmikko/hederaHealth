import * as actions from '../actions/actions'

const initialState = {
    patient: {
        address: '',
        diagnosis: null
    },
    strategy: null,
    measures: [
        {
            name: 'Weight',
            value: 0,
            isTarget: false
        },
        {
            name: 'Growth',
            value: 0,
            isTarget: false
        }
    ],
    endMeasures: null,
    strategies: [
    ],
    actions: [],
    patientResults: []
};

export default (state=initialState, action) => {
      switch(action.type) {
          case actions.GET_STRATEGIES_SUCCESS:
              return {...state, ...{
                  strategies: action.payload
          }};
          case actions.GET_CASE_SUCCESS:
              return {...state, ...action.payload};
          case actions.UPDATE_CASE_SUCCESS:
              return {...state, ...action.payload};
          default:
              return state;
      }
}


