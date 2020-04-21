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
    case ADD_IB:
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
      return {
        ...state,
        partner: action.payload
      }
    case PART_ACCOUNT:
        return {
          ...state,
          partAcc: action.payload
        }      
    case PARTS_COMMISION:
        return {
          ...state,
          allCommision: action.payload
        }       
    case PART_COMMISION:
        return {
          ...state,
          commision: action.payload
        }           
    case ADD_DEPOSIT:
    case GET_DEPOSIT:
    case DELETE_DEPOSIT:
    case ADD_WITHDRAW:
    case GET_WITHDRAW:
    case DELETE_WITHDRAW:
    case GET_TRANSFER:
    case ADD_TRANSFER:
    case DELETE_TRANSFER:
    case GET_IB:
        return {
          ...state,
          ib: action.payload
        };      
    default:
      return state;
  }
};
