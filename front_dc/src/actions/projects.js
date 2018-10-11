import { RSAA } from 'redux-api-middleware';
import { withAuth } from '../reducers'
import { getFullAPIAddress } from '../config'
import * as actions from './actions'


export const getProjectData = (address) => {
  console.log('[API Call]: Get Project Details');
  return ({
  [RSAA]: {
      endpoint: getFullAPIAddress ('/api/projects/' + address + '/'),
      method: 'GET',
      headers: withAuth({ 'Content-Type': 'application/json' }),
      types: [
          {
              type: actions.DATA_REQUEST,
              payload: {
                  tokenContractAddress: address
              },
          },
          actions.DATA_SUCCESS,
          actions.DATA_FAILURE,
      ]
  }
});
}

