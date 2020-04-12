import axios from "axios";
import history from "../history";
import { tokenConfig, tokenConfig2 } from "./auth";
import {
  OPTION_LOADED,
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
} from "./types";

// Get option
export const loadOption = () => async (dispatch, getState) => {
  const res = await axios.get(`/user/choices`, tokenConfig(getState));
  dispatch({
    type: OPTION_LOADED,
    payload: res.data
  });
};

// Add file
export const addFile = files => async (dispatch, getState) => {
    console.log(files);
    const formData = new FormData();
    formData.append("fxuser", files.fxuser);
    formData.append("doc_photo_id", files[0].file);
    formData.append("doc_proof_of_residence", files[1].file);
    formData.append("doc_photo_id_2", files[2].file);
    formData.append("doc_proof_of_residence_2", files[3].file);
    

  const res = await axios.post("/user/document/new",formData, tokenConfig(getState));
  dispatch({
    type: ADD_FILE,
    payload: res.data
  });
};

// Get file
export const getFile = () => async dispatch => {
  const res = await axios.get(
    `/user/document/${fxuser_id}`,
    tokenConfig(getState)
  );
  dispatch({
    type: OPTION_LOADED,
    payload: res.data
  });
};

// Delete file
export const delFile = () => async dispatch => {
  const res = await axios.delete(
    `/user/document/${fxuser_id}`,
    tokenConfig(getState)
  );
  dispatch({
    type: OPTION_LOADED,
    payload: res.data
  });
};

// Edit file
export const editFile = () => async dispatch => {
  const res = await axios.patch(
    `/user/document/${fxuser_id}`,
    tokenConfig(getState)
  );
  dispatch({
    type: OPTION_LOADED,
    payload: res.data
  });
};

// Add account
export const addAccount = () => async dispatch => {
  const res = await axios.post(`/fxuser/${user_id}`, tokenConfig(getState));
  dispatch({
    type: OPTION_LOADED,
    payload: res.data
  });
};

// Get Account
export const getAccount = () => async dispatch => {
  const res = await axios.get(`/fxuser/${user_id}`, tokenConfig(getState));
  dispatch({
    type: OPTION_LOADED,
    payload: res.data
  });
};

// Delete Account
export const delAccount = () => async dispatch => {
  const res = await axios.delete(
    `/fxaccount/${user_id}/${account_id}`,
    tokenConfig(getState)
  );
  dispatch({
    type: OPTION_LOADED,
    payload: res.data
  });
};

// Get Trading history
export const getTrading = () => async dispatch => {
  const res = await axios.get(
    `/fxaccount/tradinghistory/${user_id}`,
    tokenConfig(getState)
  );
  dispatch({
    type: OPTION_LOADED,
    payload: res.data
  });
};

// Get Partner info
export const partLoad = () => async dispatch => {
  const res = await axios.get(
    `/user/myclient/${referral_code}`,
    tokenConfig(getState)
  );
  dispatch({
    type: OPTION_LOADED,
    payload: res.data
  });
};

// Get Partner Account
export const partAccount = () => async dispatch => {
  const res = await axios.get(
    `/fxaccount/clientaccount/${user_id}`,
    tokenConfig(getState)
  );
  dispatch({
    type: OPTION_LOADED,
    payload: res.data
  });
};

// Get All Partner commision
export const partsCommision = () => async dispatch => {
  const res = await axios.get(
    `/fxaccount/commissionhistory/${user_id}`,
    tokenConfig(getState)
  );
  dispatch({
    type: OPTION_LOADED,
    payload: res.data
  });
};

// Get Partner commision
export const partCommision = () => async dispatch => {
  const res = await axios.get(
    `/fxaccount/commissionhistory/${user_id}/${mt4_login}`,
    tokenConfig(getState)
  );
  dispatch({
    type: OPTION_LOADED,
    payload: res.data
  });
};

// Add Deposit
export const addDeposit = () => async dispatch => {
  const res = await axios.post(
    `/fxaccount/deposit/${user_id}`,
    tokenConfig(getState)
  );
  dispatch({
    type: OPTION_LOADED,
    payload: res.data
  });
};

// Get Deposit
export const getDeposit = () => async dispatch => {
  const res = await axios.get(
    `/fxaccount/deposit/${user_id}`,
    tokenConfig(getState)
  );
  dispatch({
    type: OPTION_LOADED,
    payload: res.data
  });
};

// Delete Deposit
export const delDeposit = () => async dispatch => {
  const res = await axios.delete(
    `/fxaccount/deposit/${user_id}/${deposit_pk}`,
    tokenConfig(getState)
  );
  dispatch({
    type: OPTION_LOADED,
    payload: res.data
  });
};

// Add withdraw
export const addWithdraw = () => async dispatch => {
  const res = await axios.post(
    `/fxaccount/withdraw/${user_id}`,
    tokenConfig(getState)
  );
  dispatch({
    type: OPTION_LOADED,
    payload: res.data
  });
};

// Get Withdraw
export const getWithdraw = () => async dispatch => {
  const res = await axios.get(
    `/fxaccount/withdraw/${user_id}`,
    tokenConfig(getState)
  );
  dispatch({
    type: OPTION_LOADED,
    payload: res.data
  });
};

// Delete withdraw
export const delWithdraw = () => async dispatch => {
  const res = await axios.get(
    `/fxaccount/withdraw/${user_id}/${withdraw_pk}`,
    tokenConfig(getState)
  );
  dispatch({
    type: OPTION_LOADED,
    payload: res.data
  });
};

// Get transfer
export const getTransfer = () => async dispatch => {
  const res = await axios.get(`/fxaccount/transfer`, tokenConfig(getState));
  dispatch({
    type: OPTION_LOADED,
    payload: res.data
  });
};

// Add Transfer
export const addTransfer = () => async dispatch => {
  const res = await axios.post(`/fxaccount/transfer`, tokenConfig(getState));
  dispatch({
    type: OPTION_LOADED,
    payload: res.data
  });
};

// Delete transfer
export const delTransfer = () => async dispatch => {
  const res = await axios.delete(`/fxaccount/transfer`, tokenConfig(getState));
  dispatch({
    type: OPTION_LOADED,
    payload: res.data
  });
};

// Add IB
export const addIb = () => async dispatch => {
  const res = await axios.get(
    `/user/introducingbroker/new`,
    tokenConfig(getState)
  );
  dispatch({
    type: OPTION_LOADED,
    payload: res.data
  });
};

// Get IB
export const getIb = () => async dispatch => {
  const res = await axios.get(
    `/user/introducingbroker/${user_id}`,
    tokenConfig(getState)
  );
  dispatch({
    type: OPTION_LOADED,
    payload: res.data
  });
};

// Edit IB
export const editIb = () => async dispatch => {
  const res = await axios.patch(
    `/user/introducingbroker/${user_id}`,
    tokenConfig(getState)
  );
  dispatch({
    type: OPTION_LOADED,
    payload: res.data
  });
};
