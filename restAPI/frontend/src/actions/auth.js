import axios from "axios";
import { stopSubmit } from "redux-form";

import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_DETAIL_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  RESET_SEND_SUCCESS,
  RESET_SEND_FAIL,
  RESET_SUCCESS,
  RESET_FAIL,
  EMAIL_ACTIVATE,
  EMAIL_ACTIVATE_FAIL
} from "./types";

// LOAD USER
export const loadUser = () => async (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  try {
    const res = await axios.get("/auth/users/me", tokenConfig(getState));
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// REGISTER USER
export const register = ({
  resident_country,
  first_name,
  last_name,
  email,
  password,
  is_admin,
  referral_code
}) => async dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request Body
  const body = JSON.stringify({
    resident_country,
    first_name,
    last_name,
    email,
    password,
    is_admin,
    referral_code
  });

  try {
    const res = await axios.post("/auth/users/", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL
    });
    dispatch(stopSubmit("registerForm", err.response.data));
  }
};

// REGISTER ADDRESS
export const registDetail = ({
  //    auth/AddressForm
  address,
  postal_code,
  city,
  //    auth/PersonalForm
  Nationality,
  birthday,
  mobile,
  //    mypage/employForm
  employment_status,
  industry,
  employment_position,
  education_level,
  //    mypage/financialForm
  annual_income,
  income_source,
  trading_experience,
  trading_period,

  user_status
}) => async (dispatch, getState) => {

  // Request Body
  const body = JSON.stringify({
    address,
    postal_code,
    city,
    Nationality,
    birthday,
    mobile,
    employment_status,
    industry,
    employment_position,
    education_level,
    annual_income,
    income_source,
    trading_experience,
    trading_period,

    user_status,
  });
  
  try {
    const res = await axios.patch(`/user/${getState().auth.id}`, body, tokenConfig(getState));
    dispatch({
      type: REGISTER_DETAIL_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL
    });
    dispatch(stopSubmit("detailForm", err.response.data));
  }
};

// LOGIN USER
export const login = ({ email, password }) => async dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request Body
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/auth/token/login", body, config);
    const authConfig = {
      headers: {
        Authorization: `Token ${res.data.auth_token}`
      }
    };
    const resAuth = await axios.get("/auth/users/me", authConfig);
    resAuth.data.token = res.data.auth_token;

    dispatch({
      type: LOGIN_SUCCESS,
      payload: resAuth.data
    });
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL
    });
    dispatch(stopSubmit("loginForm", err.response.data));
  }
};

// LOGOUT USER
export const logout = () => async (dispatch, getState) => {
  await axios.post("/auth/token/logout", null, tokenConfig(getState));
  dispatch({
    type: LOGOUT_SUCCESS
  });
};

// RESET PASSWORD SEND EMAIL
export const reset = ({ email }) => async dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request Body
  const body = JSON.stringify({ email });

  try {
    const res = await axios.post("/auth/users/reset_password/", body, config);
    dispatch({
      type: RESET_SEND_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: RESET_SEND_FAIL
    });
    dispatch(stopSubmit("resetForm", err.response.data));
  }
};

// RESET PASSWORD
export const resetPassword = ({ uid, token, new_password, re_new_password }) => async dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request Body
  const body = JSON.stringify({ uid, token, new_password, re_new_password });

  try {
    const res = await axios.post("/auth/users/reset_password_confirm/", body, config);
    dispatch({
      type: RESET_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: RESET_FAIL
    });
    dispatch(stopSubmit("resetPassForm", err.response.data));
  }
};

// RESET PASSWORD
export const emailActive = ( uid, token ) => async dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request Body
  const body = JSON.stringify({ uid, token });

  try {
    const res = await axios.post("/auth/users/activation/", body, config);
    dispatch({
      type: EMAIL_ACTIVATE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EMAIL_ACTIVATE_FAIL
    });
    dispatch(stopSubmit("resetPassForm", err.response.data));
  }
};

export const tokenConfig = getState => {
  // Get token
  const token = getState().auth.token;
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};

export const tokenConfig2 = getState => {
  // Get token
  const token = getState().auth.token;
  // Headers
  const config = {
    headers: {
      "Content-Type": "multipart/form-data;"
    }
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};