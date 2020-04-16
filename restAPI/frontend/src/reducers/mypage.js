import _ from "lodash";
import {
  GET_OPTION,
  ADD_FILE,
  GET_FILE,
  DELETE_FILE,
  EDIT_FILE,
  ADD_ACCOUNT,
  GET_ACCOUNT,
  DELETE_ACCOUNT,
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
    case GET_OPTION:
      return {
        ...state,
        option: _.map(action.payload)
      };
    case ADD_FILE:
    case EDIT_FILE:
      return true;
    case GET_FILE:
      return {
        file: action.payload
      };
    case DELETE_FILE:
    case ADD_ACCOUNT:
      console.log(action.payload)
      return false;
    case GET_ACCOUNT:
    case DELETE_ACCOUNT:
    case GET_TRADING:
    case PART_LOADED:
    case PART_ACCOUNT:
    case PARTS_COMMISION:
    case PART_COMMISION:
    case ADD_DEPOSIT:
    case GET_DEPOSIT:
    case DELETE_DEPOSIT:
    case ADD_WITHDRAW:
    case GET_WITHDRAW:
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
