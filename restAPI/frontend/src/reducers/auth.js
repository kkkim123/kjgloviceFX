import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,  
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  REGISTER_DETAIL_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS
} from '../actions/types';

const initialState = {
  isLoading: false,
  isAuthenticated: null,
  user: null,
  token: localStorage.getItem('token')
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload
      };    
    case REGISTER_SUCCESS:
      return {
        isLoading: false,
        ...action.payload
      };
    case REGISTER_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
      };      
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
        token: action.payload.token
      };
    case AUTH_ERROR:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
      localStorage.removeItem('token');
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        token: null
      };
    default:
      return state;
  }
}
