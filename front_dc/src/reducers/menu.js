import { LOCATION_CHANGE } from 'react-router-redux';
import { updateState } from "../utils/updateState";

const initialState = {
    menuItem: '' ,
};

export default (state=initialState, action) => {
    switch ( action.type ) {
        case LOCATION_CHANGE:
            let path = action.payload.pathname;
            const selectedMenuItem = path.split('/')[1];

            return updateState(state, { menuItem: selectedMenuItem })

    }
    return state;
};

export const getMenuItem = (state) => state.menuItem;

