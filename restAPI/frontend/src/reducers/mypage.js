import _ from "lodash";
import {
  GET_USER_OPTION,
  GET_ACCOUNT_OPTION,
  ADD_FILE,
  GET_FILE,
  DELETE_FILE,
  EDIT_FILE,
  ADD_ACCOUNT,
  GET_ACCOUNT,
  DELETE_ACCOUNT,
  CHANGE_ACCOUNT,
  GET_TRADING,
  PART_LOADED,
  PART_ACCOUNT,
  PARTS_COMMISION,
  PART_COMMISION,
  ADD_DEPOSIT,
  GET_DEPOSIT,
  DELETE_DEPOSIT,
  ADD_WITHDRAW,
  GET_WITHDRAW,
  DELETE_WITHDRAW,
  GET_TRANSFER,
  ADD_TRANSFER,
  DELETE_TRANSFER,
  ADD_IB,
  GET_IB,
  EDIT_IB
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_USER_OPTION:
      return {
        ...state,
        userOption: _.map(action.payload)
      };
    case GET_ACCOUNT_OPTION:
      return {
        ...state,
        accOption: _.map(action.payload)
      }
    case ADD_FILE:
    case EDIT_FILE:
    case ADD_ACCOUNT:
      return true;
    case GET_FILE:
      return {
        ...state,
        file: action.payload
      };
    case DELETE_FILE:
    
    case GET_ACCOUNT:
      return { 
        ...state,
        account: _.map(action.payload)
      }
    case DELETE_ACCOUNT:
        return _.omit(state, action.payload);
    case CHANGE_ACCOUNT:
        return {
          ...state,
          accNum: action.payload
        }
    case GET_TRADING:
        return { 
          ...state,
          history: _.map(action.payload)
        }
    case PART_LOADED:
    case PART_ACCOUNT:
    case PARTS_COMMISION:
    case PART_COMMISION:
    case ADD_DEPOSIT:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
        id: action.payload.id
      }
    case GET_DEPOSIT:
      return {
        ...state,
        deposit: action.payload
      }
    case DELETE_DEPOSIT:
      return _.omit(state, action.payload);
    case ADD_WITHDRAW:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
        id: action.payload.id
      }
    case GET_WITHDRAW:
      return {
        ...state,
        withdraw: action.payload
      }
    case DELETE_WITHDRAW:
    case GET_TRANSFER:
    case ADD_TRANSFER:
    case DELETE_TRANSFER:
    case ADD_IB:
    case GET_IB:
    case EDIT_IB:
    default:
      return state;
  }
};
