import axios from "axios";
import { tokenConfig } from "./auth";

import {
    FOOTER_LOADING,
    FOOTER_LOADING_FAIL,
    GET_FOREX_QUOTE
} from "./types";


// Get Footer metaquotes
export const getMetaQuotes = () => async (dispatch, getState) => {
    try {
        const res = await axios.get(`/user/footer/quote`, tokenConfig(getState));
        dispatch({        
            type: FOOTER_LOADING,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: FOOTER_LOADING_FAIL
        });
        // dispatch(stopSubmit("Footer", err.response.data));
    }
    
};


export const getMarketQuotes = (symbol) => async (dispatch, getState) => {
    try {
        const res = await axios.get(`/user/mt4/quote?symbol=${symbol}`, tokenConfig(getState));
        dispatch({        
            type: GET_FOREX_QUOTE,
            payload: res.data
        });
    } catch (err) {
        // dispatch(stopSubmit("Quotes", err.response.data));
    }
};