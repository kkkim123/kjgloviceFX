import axios from "axios";
import { stopSubmit } from "redux-form";
import history from "../history";
import { tokenConfig } from "./auth";

import {
  REGISTER_DETAIL_SUCCESS,
  GET_USER_OPTION,
  GET_ACCOUNT_OPTION,
  ADD_FILE,
  GET_FILE,
  DELETE_FILE,
  EDIT_FILE,
  ADD_ACCOUNT,
  GET_ACCOUNT,
  DELETE_ACCOUNT,
  GET_TRADING,
  CHANGE_ACCOUNT,
  CHANGE_PART_ACCOUNT,
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
} from "./types";

// Get user option
export const getUserOption = () => async (dispatch, getState) => {
  const res = await axios.get(`/user/choices`, tokenConfig(getState));
  dispatch({
    type: GET_USER_OPTION,
    payload: res.data
  });
};

//Get Account option
export const getAccOption = () => async (dispatch, getState) => {
  const res = await axios.get(`/fxaccount/choices`, tokenConfig(getState));
  dispatch({
    type: GET_ACCOUNT_OPTION,
    payload: res.data
  });
};

// Add file
export const addFile = (files) => async (dispatch, getState) => {
  const formData = new FormData();
  formData.append("fxuser", getState().auth.id);
  formData.append("doc_photo_id", files.doc_photo_id);
  formData.append("doc_proof_of_residence", files.doc_proof_of_residence);
  formData.append("doc_photo_id_2", files.doc_photo_id_2);
  formData.append("doc_proof_of_residence_2", files.doc_proof_of_residence_2);

  try {
    const res = await axios.post("/user/document/new", formData, tokenConfig(getState));
    dispatch({
      type: ADD_FILE,
      // payload: res.data
      payload: res.status
    })
  } catch (err) {
    dispatch({
      type: FAIL,
      payload: err.response.status
    });
  }  
};

// Get file
export const getFile = () => async (dispatch, getState) => {
  const res = await axios.get(
    `/user/document/${getState().auth.id}`,
    tokenConfig(getState)
  );
  dispatch({
    type: GET_FILE,
    payload: res.data
  });
};

// Delete file
export const delFile = () => async (dispatch, getState) => {
  const res = await axios.delete(
    `/user/document/${getState().auth.id}`,
    tokenConfig(getState)
  );
  dispatch({
    type: DELETE_FILE,
    payload: res.data
  });
};

// Edit file
export const editFile = files => async (dispatch, getState) => {
  const formData = new FormData();
  formData.append("fxuser", getState().auth.id);

  if(files.doc_photo_id) {
    formData.append("doc_photo_id", files.doc_photo_id);
  }
  if(files.doc_proof_of_residence) {
    formData.append("doc_proof_of_residence", files.doc_proof_of_residence);
  }
  if(files.doc_photo_id_2) {
    formData.append("doc_photo_id_2", files.doc_photo_id_2);
  }
  if(files.doc_proof_of_residence_2) {
    formData.append("doc_proof_of_residence_2", files.doc_proof_of_residence_2);
  }      
  
  try {
    const res = await axios.patch(`/user/document/${getState().auth.id}`, formData, tokenConfig(getState));
    dispatch({
      type: EDIT_FILE,
      // payload: res.data
      payload: res.status
    })
  } catch (err) {
    dispatch({
      type: FAIL,
      payload: err.response.status
    });
  }  
};

// Add account
export const addAccount = ({account_type, base_currency, trading_platform, leverage, account_name}) => async (dispatch, getState) => {
  const body = JSON.stringify({
    account_type,
    base_currency,
    trading_platform,
    leverage,
    account_name,
    user: getState().auth.id,
    referral_code: getState().auth.user.referral_code === null ? 2002 : getState().auth.user.referral_code
  });

  const res = await axios.post(`/fxaccount/${getState().auth.id}`,body, tokenConfig(getState));
  dispatch({
    type: ADD_ACCOUNT,
    payload: res.data
  });
};

// Get Account
export const getAccount = () => async (dispatch, getState) => {
  const res = await axios.get(`/fxaccount/${getState().auth.id}`, tokenConfig(getState));
  dispatch({
    type: GET_ACCOUNT,
    payload: res.data
  });
};

// Delete Account
export const delAccount = id => async (dispatch, getState) => {
  await axios.delete(
    `/fxaccount/${getState().auth.id}/${id}`,
    tokenConfig(getState)
  );
  dispatch({
    type: DELETE_ACCOUNT,
    payload: id
  });
  history.push('/mypage/details/account/detail')
};

// Get Trading history
export const getTrading = ({from_date, to_date, page, acc, symbol, type}) => async (dispatch, getState) => {

  if(!symbol) {
    symbol = ""
  } else {
    symbol = symbol.toUpperCase()
  }

  if(!type) {
    type = ""
  } else {
    switch (type.toUpperCase()) {
      case "BUY":
        type = 0;
        break;
      case "SELL":
        type = 1;
        break;
      case "BUY LIMIT":
        type = 2;
        break;
      case "SELL LIMIT":
        type = 3;
        break;
      case "BUY STOP":
        type = 4;
        break;
      case "SELL STOP":
        type = 5;
        break;
      case "BALANCE":
        type = 6;
        break;
      case "CREDIT":
        type = 7;
        break;
      default:
        type = "";
        break;
    }
  }

  const res = await axios.get(`/fxaccount/tradinghistory/${getState().auth.id}?from_date=${from_date}&to_date=${to_date}&page=${page}&acc=${acc}&symbol=${symbol}&type=${type}`, tokenConfig(getState));
  dispatch({
    type: GET_TRADING,
    payload: res.data
  });
};

// Get Trading Account
export const changeAcc = acc => async dispatch => {
  dispatch({
    type: CHANGE_ACCOUNT,
    payload: acc
  });
};

// Get Partner Account
export const changePartAcc = partAcc => async dispatch => {
  dispatch({
    type: CHANGE_PART_ACCOUNT,
    payload: partAcc
  });
};

// Get Partner info
export const partLoad = ib_code => async (dispatch, getState) => {
  const res = await axios.get(`/user/myclient/${ib_code}`, tokenConfig(getState));
  dispatch({
    type: PART_LOADED,
    payload: res.data
  });
};

// Get Partner Account
export const partAccount = () => async (dispatch, getState) => {
  const res = await axios.get(`/fxaccount/clientaccountlist/${getState().auth.id}`, tokenConfig(getState));
  dispatch({
    type: PART_ACCOUNT,
    payload: res.data
  });
};

// Get All Partner commision
export const partsCommision = ({from_date, to_date}) => async (dispatch, getState) => {
  const res = await axios.get(
    `/fxaccount/commissionhistory/${getState().auth.id}?from_date=${from_date}&to_date=${to_date}`, tokenConfig(getState)
  );
  dispatch({
    type: PARTS_COMMISION,
    payload: res.data
  });
};

// Get Partner commision
export const partCommision = ({from_date, to_date, acc}) => async (dispatch, getState) => {
  const res = await axios.get(
    `/fxaccount/commissionhistory/${getState().auth.id}/${acc}?from_date=${from_date}&to_date=${to_date}`,
    tokenConfig(getState)
  );
  dispatch({
    type: PART_COMMISION,
    payload: res.data
  });
};

// Add Deposit
export const addDeposit = () => async (dispatch, getState) => {
  const res = await axios.post(
    `/fxaccount/deposit/${getState().auth.id}`,
    tokenConfig(getState)
  );
  dispatch({
    type: GET_USER_OPTION,
    payload: res.data
  });
};

// Get Deposit
export const getDeposit = () => async (dispatch, getState) => {
  const res = await axios.get(
    `/fxaccount/deposit/${getState().auth.id}`,
    tokenConfig(getState)
  );
  dispatch({
    type: GET_USER_OPTION,
    payload: res.data
  });
};

// Delete Deposit
export const delDeposit = () => async (dispatch, getState) => {
  const res = await axios.delete(
    `/fxaccount/deposit/${getState().auth.id}/${deposit_pk}`,
    tokenConfig(getState)
  );
  dispatch({
    type: GET_USER_OPTION,
    payload: res.data
  });
};

// Add withdraw
export const addWithdraw = () => async (dispatch, getState) => {
  const res = await axios.post(
    `/fxaccount/withdraw/${getState().auth.id}`,
    tokenConfig(getState)
  );
  dispatch({
    type: GET_USER_OPTION,
    payload: res.data
  });
};

// Get Withdraw
export const getWithdraw = () => async (dispatch, getState) => {
  const res = await axios.get(
    `/fxaccount/withdraw/${getState().auth.id}`,
    tokenConfig(getState)
  );
  dispatch({
    type: GET_USER_OPTION,
    payload: res.data
  });
};

// Delete withdraw
export const delWithdraw = () => async (dispatch, getState) => {
  const res = await axios.get(
    `/fxaccount/withdraw/${getState().auth.id}/${withdraw_pk}`,
    tokenConfig(getState)
  );
  dispatch({
    type: GET_USER_OPTION,
    payload: res.data
  });
};

// Get transfer
export const getTransfer = () => async (dispatch, getState) => {
  const res = await axios.get(`/fxaccount/transfer`, tokenConfig(getState));
  dispatch({
    type: GET_TRANSFER,
    payload: res.data
  });
};

// Add Transfer
export const addTransfer = (formValues) => async (dispatch, getState) => {
  formValues.user = getState().auth.id;

  const res = await axios.post(`/fxaccount/transfer`,formValues, tokenConfig(getState));
  dispatch({
    type: ADD_TRANSFER,
    payload: res.status
  });
};

// Delete transfer
export const delTransfer = id => async (dispatch, getState) => {
  console.log(id);
  return false;
  const res = await axios.delete(`/fxaccount/transfer`, tokenConfig(getState));
  dispatch({
    type: DELETE_TRANSFER,
    payload: res.data
  });
};

// Add IB
export const addIb = ({ib_name, email, send_report, ib_website }) => async (dispatch, getState) => {
  const body = JSON.stringify({
    ib_name,
    email,
    send_report,
    ib_website,
    fxuser: getState().auth.id,
  });

  const res = await axios.post(
    `/user/introducingbroker/new`, body, tokenConfig(getState));
  dispatch({
    type: ADD_IB,
    payload: res.status
  });
};

// Get IB
export const getIb = () => async (dispatch, getState) => {
  const res = await axios.get(
    `/user/introducingbroker/${getState().auth.id}`,
    tokenConfig(getState)
  );
  dispatch({
    type: GET_IB,
    payload: res.data
  });
};

// Edit IB
export const editIb = ({ib_name, point, email, send_report, ib_website }) => async (dispatch, getState) => {
  const body = JSON.stringify({
    ib_name,
    point,
    email,
    send_report,
    ib_website,
    status:'P'
  });
  const res = await axios.patch(
    `/user/introducingbroker/${getState().auth.id}`, body, tokenConfig(getState));
  dispatch({
    type: EDIT_IB,
    payload: res.data
  });
};

 // Depoist List
 export const DepoistList = (page = 1) => async (dispatch, getState) => {
   
  try {
   const res = await axios.get(`/fxaccount/deposit/${getState().auth.id}?page=${page}`, tokenConfig(getState));
   
   dispatch({
     type: GET_DEPOSIT,
     payload: res.data
   });
  } catch (err) {
   dispatch(stopSubmit("DepositForm", err.response.data))
  }
};

// Deposit Register
export const DepositRegist = ({
  mt4_account,
  currency,
  deposit_crypto,
  crypto_address,
  crypto_amount,
  cellphone_number
}) => async (dispatch, getState) => {
  const body = JSON.stringify({
    mt4_account,
    currency,
    deposit_crypto,
    crypto_address,
    crypto_amount,
    cellphone_number,
    user: getState().auth.id
  });

  try {
    const res = await axios.post(`/fxaccount/deposit/${getState().auth.id}`, body, tokenConfig(getState));
    dispatch({
      type: ADD_DEPOSIT,
      payload: res.data
    });
  } catch (err) {
    dispatch(stopSubmit("DepositForm", err.response.data))
  }
}

// Delete Deposit
export const deleteDeposit = id => async (dispatch, getState) => {
  await axios.delete(
    `/fxaccount/deposit/${getState().auth.id}/${id}`,
    tokenConfig(getState)
  );
  dispatch({
    type: DELETE_DEPOSIT,
    payload: id
  });
  history.push('/mypage/details/account/detail')
};

// Withdraw List
export const WithdrawList = (page = 1) => async (dispatch, getState) => {
  try {
   const res = await axios.get(`/fxaccount/withdraw/${getState().auth.id}?page=${page}`, tokenConfig(getState));
   dispatch({
     type: GET_WITHDRAW,
     payload: res.data
   });
  } catch (err) {
   dispatch(stopSubmit("WithdrawForm", err.response.data))
  }
};

// Withdraw Register
export const WithdrawRegist = ({
  mt4_account,
  currency,
  withdraw_crypto,
  crypto_address,
  amount,
  cellphone_number
}) => async (dispatch, getState) => {
  const body = JSON.stringify({
    mt4_account,
    currency,
    withdraw_crypto,
    crypto_address,
    crypto_amount: amount,
    cellphone_number,
    user: getState().auth.id
  });

  try {
    const res = await axios.post(`/fxaccount/withdraw/${getState().auth.id}`, body, tokenConfig(getState));
    dispatch({
      type: ADD_WITHDRAW,
      payload: res.data
    });
  } catch (err) {
    dispatch(stopSubmit("WithdrawForm", err.response.data))
  }
}

// Delete Withdraw
export const deleteWithdraw = id => async (dispatch, getState) => {
  await axios.delete(
    `/fxaccount/withdraw/${getState().auth.id}/${id}`,
    tokenConfig(getState)
  );
  dispatch({
    type: DELETE_WITHDRAW,
    payload: id
  });
  history.push('/mypage/details/account/detail')
};

// Delete Withdraw
export const getWallet = () => async (dispatch, getState) => {
  const res = await axios.get(`/wallet/${getState().auth.id}`, tokenConfig(getState));
  dispatch({
    type: GET_WALLET,
    payload: res.data
  });
};

 // Get Chart Data
 export const getProfit = acc => async (dispatch, getState) => {
   const res = await axios.get(`/fxaccount/dailytrading/${getState().auth.id}/${acc}`, tokenConfig(getState));
   dispatch({
     type: GET_CHART,
     payload: res.data.data
   });
};

// Get User Balance Info (input: user 계좌번호)
export const getOverview = acc => async (dispatch, getState) => {
  const res = await axios.get(
    `/user/mypage/overview/${acc}`,
    tokenConfig(getState)
  );
  dispatch(
    {
    type: GET_USER_BALANCE,
    payload: res.data
  });
};