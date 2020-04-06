import axios from "axios";
import { stopSubmit } from "redux-form";

import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  RESET_SEND_SUCCESS,
  RESET_SEND_FAIL
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
  is_admin
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
    is_admin
  });

  console.log(body);
  return false;

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
  address,
  postal_code,
  city,
  Nationality,
  birthday,
  mobile
}) => async dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request Body
  const body = JSON.stringify({
    address,
    postal_code,
    city,
    Nationality,
    birthday,
    mobile
  });

  console.log(body);
  return false;

  try {
    const res = await axios.post("/auth/users/me", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
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

// RESET PASSWORD
export const reset = ({ email }) => async dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request Body
  const body = JSON.stringify({ email });

  console.log(body);
  return false;

  try {
    const res = await axios.post("/auth/token/login", body, config);
    const authConfig = {
      headers: {
        Authorization: `Token ${res.data.auth_token}`
      }
    };
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

// helper function
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
