import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS
} from '../actions/types';

const initialState = {
  isLoading: false,
  isAuthenticated: null,
  email: null,
  token: localStorage.getItem('token')
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      // localStorage.setItem('token', action.payload.auth_token);
      // return {
      //   ...state,
      //   isLoading: false,
      //   isAuthenticated: true,
      //   ...action.payload
      // };
      return {isLoading: false, ...action.payload};
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.token);
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        ...action.payload
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
      localStorage.removeItem('token');
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        email: null,
        token: null
      };
    default:
      return state;
  }
}
