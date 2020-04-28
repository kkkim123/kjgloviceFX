import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  REGISTER_DETAIL_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  RESET_SEND_SUCCESS,
  RESET_SEND_FAIL,
  RESET_SUCCESS,
  RESET_FAIL,
  EMAIL_ACTIVATE_FAIL,
  EMAIL_ACTIVATE,
  GET_USER,
  CHANGE_SUCCESS
} from "../actions/types";

const initialState = {
  isLoading: false,
  isAuthenticated: null,
  user: null,
  token: localStorage.getItem("token"),
  id: localStorage.getItem("id"),
  msg: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
    case GET_USER:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
        id: action.payload.id
      };
    case REGISTER_SUCCESS:
      return {
        isLoading: false,
        ...action.payload,
        msg: action.status
      };
    case REGISTER_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
        id: action.payload.id,
        msg: action.status
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("id", action.payload.id);
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
        token: action.payload.token,
        id: action.payload.id
      };
    case RESET_SEND_SUCCESS:
    case RESET_SEND_FAIL:
    case RESET_SUCCESS:
    case RESET_FAIL:
    case EMAIL_ACTIVATE:
    case EMAIL_ACTIVATE_FAIL:
    case CHANGE_SUCCESS:
      return true;
    case AUTH_ERROR:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        id: null,
      };
    default:
      return state;
  }
}
