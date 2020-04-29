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
  CHANGE_PART_ACCOUNT,
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
  EDIT_IB,
  FAIL,
  GET_WALLET,
  GET_CHART,
  GET_USER_BALANCE
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
      };
    case ADD_ACCOUNT:
    case EDIT_IB:
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
      };
    case DELETE_ACCOUNT:
      return _.omit(state, action.payload);
    case CHANGE_ACCOUNT:
      return {
        ...state,
        accNum: action.payload
      };
    case CHANGE_PART_ACCOUNT:
      return {
        ...state,
        partAccNum: action.payload
      }  
    case GET_TRADING:
      return {
        ...state,
        history: _.map(action.payload)
      };
    case PART_LOADED:
      return {
        ...state,
        partner: action.payload
      };
    case PART_ACCOUNT:
      return {
        ...state,
        partAcc: action.payload
      };
    case PARTS_COMMISION:
      return {
        ...state,
        allCommision: action.payload
      };
    case PART_COMMISION:
      return {
        ...state,
        commision: action.payload
      };
    case ADD_DEPOSIT:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
        id: action.payload.id
      };
    case GET_DEPOSIT:
      return {
        ...state,
        deposit: action.payload
      };
    case DELETE_DEPOSIT:
      return _.omit(state, action.payload);
    case ADD_WITHDRAW:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
        id: action.payload.id
      };
    case GET_WITHDRAW:
      return {
        ...state,
        withdraw: action.payload
      };
    case DELETE_WITHDRAW:
    case GET_TRANSFER:
      return {
        ...state,
        transfer: action.payload
      }
    case DELETE_TRANSFER:
    case GET_IB:
      return {
        ...state,
        ib: action.payload
      };
    case GET_WALLET:
      return {
        ...state,
        wallet: action.payload
      };
    case GET_CHART:
        return {
          ...state,
          data: action.payload
        };      
    case ADD_FILE:
    case FAIL:
    case EDIT_FILE:
    case ADD_IB:
    case ADD_TRANSFER:      
      return {
        msg: action.payload
      };
    case GET_USER_BALANCE:
      return {
        ...state,
        info: action.payload
      };
    default:
      return state;
  }
};
