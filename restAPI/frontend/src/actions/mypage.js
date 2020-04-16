import axios from "axios";
import history from "../history";
import { tokenConfig } from "./auth";
import {
  REGISTER_DETAIL_SUCCESS,
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
} from "./types";

// Get option
export const getOption = () => async (dispatch, getState) => {
  const res = await axios.get(`/user/choices`, tokenConfig(getState));
  dispatch({
    type: GET_OPTION,
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

  const res = await axios.post(
    "/user/document/new",
    formData,
    tokenConfig(getState)
  );
  dispatch({
    type: ADD_FILE,
    payload: res.data
  });
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
    type: GET_OPTION,
    payload: res.data
  });
};

// Edit file
export const editFile = files => async (dispatch, getState) => {
  const formData = new FormData();
  formData.append("fxuser", files.fxuser);

  switch (files.name) {
    case "id":
      formData.append("doc_photo_id", files[0].file);
      break;
    case "id2":
      formData.append("doc_photo_id_2", files[0].file);
      break;
    case "res":
      formData.append("doc_proof_of_residence", files[0].file);
      break;
    case "res2":
      formData.append("doc_proof_of_residence_2", files[0].file);
      break;
    default:
      break;
  }

  const res = await axios.patch(`/user/document/${getState().auth.id}`, formData, tokenConfig(getState));
  dispatch({
    type: EDIT_FILE,
    payload: res.data
  });
};

// Add account
export const addAccount = () => async (dispatch, getState) => {
  const res = await axios.post(`/fxuser/${getState().auth.id}`, tokenConfig(getState));
  dispatch({
    type: ADD_ACCOUNT,
    payload: res.data
  });
};

// Get Account
export const getAccount = () => async (dispatch, getState) => {
  const res = await axios.get(`/fxuser/${getState().auth.id}`, tokenConfig(getState));
  dispatch({
    type: GET_OPTION,
    payload: res.data
  });
};

// Delete Account
export const delAccount = () => async (dispatch, getState) => {
  const res = await axios.delete(
    `/fxaccount/${getState().auth.id}/${account_id}`,
    tokenConfig(getState)
  );
  dispatch({
    type: GET_OPTION,
    payload: res.data
  });
};

// Get Trading history
export const getTrading = () => async (dispatch, getState) => {
  const res = await axios.get(
    `/fxaccount/tradinghistory/${getState().auth.id}`,
    tokenConfig(getState)
  );
  dispatch({
    type: GET_OPTION,
    payload: res.data
  });
};

// Get Partner info
export const partLoad = () => async (dispatch, getState) => {
  const res = await axios.get(
    `/user/myclient/${referral_code}`,
    tokenConfig(getState)
  );
  dispatch({
    type: GET_OPTION,
    payload: res.data
  });
};

// Get Partner Account
export const partAccount = () => async (dispatch, getState) => {
  const res = await axios.get(
    `/fxaccount/clientaccount/${getState().auth.id}`,
    tokenConfig(getState)
  );
  dispatch({
    type: GET_OPTION,
    payload: res.data
  });
};

// Get All Partner commision
export const partsCommision = () => async (dispatch, getState) => {
  const res = await axios.get(
    `/fxaccount/commissionhistory/${getState().auth.id}`,
    tokenConfig(getState)
  );
  dispatch({
    type: GET_OPTION,
    payload: res.data
  });
};

// Get Partner commision
export const partCommision = () => async (dispatch, getState) => {
  const res = await axios.get(
    `/fxaccount/commissionhistory/${getState().auth.id}/${mt4_login}`,
    tokenConfig(getState)
  );
  dispatch({
    type: GET_OPTION,
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
    type: GET_OPTION,
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
    type: GET_OPTION,
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
    type: GET_OPTION,
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
    type: GET_OPTION,
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
    type: GET_OPTION,
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
    type: GET_OPTION,
    payload: res.data
  });
};

// Get transfer
export const getTransfer = () => async (dispatch, getState) => {
  const res = await axios.get(`/fxaccount/transfer`, tokenConfig(getState));
  dispatch({
    type: GET_OPTION,
    payload: res.data
  });
};

// Add Transfer
export const addTransfer = () => async (dispatch, getState) => {
  const res = await axios.post(`/fxaccount/transfer`, tokenConfig(getState));
  dispatch({
    type: GET_OPTION,
    payload: res.data
  });
};

// Delete transfer
export const delTransfer = () => async (dispatch, getState) => {
  const res = await axios.delete(`/fxaccount/transfer`, tokenConfig(getState));
  dispatch({
    type: GET_OPTION,
    payload: res.data
  });
};

// Add IB
export const addIb = () => async (dispatch, getState) => {
  const res = await axios.get(
    `/user/introducingbroker/new`,
    tokenConfig(getState)
  );
  dispatch({
    type: GET_OPTION,
    payload: res.data
  });
};

// Get IB
export const getIb = () => async (dispatch, getState) => {
  const res = await axios.get(
    `/user/introducingbroker/${getState().auth.id}`,
    tokenConfig(getState)
  );
  dispatch({
    type: GET_OPTION,
    payload: res.data
  });
};

// Edit IB
export const editIb = () => async (dispatch, getState) => {
  const res = await axios.patch(
    `/user/introducingbroker/${getState().auth.id}`,
    tokenConfig(getState)
  );
  dispatch({
    type: GET_OPTION,
    payload: res.data
  });
};
