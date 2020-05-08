import {
    FOOTER_LOADING
} from "../actions/types";

export default (state = {}, action) => {
    switch (action.type) {
        case FOOTER_LOADING:
            return {
                ...state,
                quotes: action.payload
            }
        default:
            return state;
    }
};