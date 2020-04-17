import axios from "axios";
import { tokenConfig } from "./auth";

import {
    FOOTER_LOADING
} from "./types";

// Get Footer metaquotes
export const getMetaQuotes = () => async (dispatch, getState) => {
    const res = await axios.get('/user/footer/quote', tokenConfig(getState));
    dispatch({        
        type: FOOTER_LOADING,
        payload: res.data
    });
};