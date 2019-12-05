import axios from "axios";
import {
  GET_USER_DETAILS,
  GET_ERRORS,
  GET_USERNAME,
  GET_EMAIL,
  GET_MESSAGE,
  GET_API_STATUS
} from "./types";

export const getUserProfileDetails = () => async dispatch => {
  try {
    const res = await axios.get(`https://kut-ty.herokuapp.com/user/`);
    dispatch({
      type: GET_USER_DETAILS,
      payload: res.data
    });
  } catch (err) {
    //console.log(err)
    if (err.response.status === 401) {
      window.location.href = "/signin";
    } else {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    }
  }
};

export const updateUsername = newUsername => async dispatch => {
  try {
    const res = await axios.put(
      `https://kut-ty.herokuapp.com/user/changeUsername/`,
      newUsername
    );
    //console.log(res);
    dispatch({
      type: GET_USERNAME,
      payload: res.data
    });
    dispatch({
      type: GET_MESSAGE,
      payload: { success: "Username updated successfully" }
    });
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (err) {
    if (err.response.status === 401) {
      window.location.href = "/signin";
    } else {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    }
  }
};

export const updateEmail = newEmail => async dispatch => {
  try {
    const res = await axios.put(
      `https://kut-ty.herokuapp.com/user/changeEmail/`,
      newEmail
    );
    //console.log(res);
    dispatch({
      type: GET_EMAIL,
      payload: res.data
    });
    dispatch({
      type: GET_MESSAGE,
      payload: { success: "Email updated successfully" }
    });
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (err) {
    if (err.response.status === 401) {
      window.location.href = "/signin";
    } else {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    }
  }
};

export const updatePassword = newPassword => async dispatch => {
  try {
    const res = await axios.put(
      `https://kut-ty.herokuapp.com/user/changePassword/`,
      newPassword
    );
    dispatch({
      type: GET_MESSAGE,
      payload: "Password updated successfully"
    });
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (err) {
    if (err.response.status === 401) {
      window.location.href = "/signin";
    } else {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    }
  }
};

export const enableAPIService = () => async dispatch => {
  try {
    const res = await axios.put(`https://kut-ty.herokuapp.com/user/enableAPIService/`);
    dispatch({
      type: GET_MESSAGE,
      payload: res.data
    });
    dispatch({
      type: GET_API_STATUS,
      payload: true
    });
  } catch (err) {
    if (err.response.status === 401) {
      window.location.href = "/signin";
    } else {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    }
  }
};
