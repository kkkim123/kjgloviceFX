import {
    FOOTER_LOADING,
    GET_FOREX_QUOTE
} from "../actions/types";

export default (state = {}, action) => {
    switch (action.type) {
        case FOOTER_LOADING:
            return {
                ...state,
                quotes: action.payload
            }
        case GET_FOREX_QUOTE:
            return {
                quotes: action.payload
            }
        default:
            return state;
    }
};