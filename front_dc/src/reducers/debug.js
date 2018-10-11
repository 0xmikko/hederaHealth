import {updateState} from "../utils/updateState";
import * as auth from "../actions/actions";

const initialState = {
  popup: undefined,
}


export default (state=initialState, action) => {

  switch (action.type) {
    case auth.POPUP:
      console.log('AAA', action);
      return updateState(state, {
                              popup: action.payload.page,
                            })
    default:
      return state
  }
}

export const isPopup = (state) => state.popup;