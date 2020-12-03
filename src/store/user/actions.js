import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken, selectStore } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage
} from "../appState/actions";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";
export const STORE_POST_SUCCESS = "STORE_POST_SUCCESS";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS"
export const UPDATE_PASSWORD_SUCCESS= "UPDATE_PASSWORD_SUCCESS"


const loginSuccess = userWithToken => {
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken
  };
};

const tokenStillValid = userWithoutToken => ({
  type: TOKEN_STILL_VALID,
  payload: userWithoutToken
});

export const logOut = () => ({ type: LOG_OUT });

export const storePostSuccess = store => ({
  type: STORE_POST_SUCCESS,
  payload: store
});

export const updateUserSuccess = (updateUser) => {
  return {
    type: UPDATE_USER_SUCCESS,
    payload: updateUser,
  };
};

export const updatePasswordSuccess = (updateUserPassword) => {
  return {
    type: UPDATE_PASSWORD_SUCCESS,
    payload: updateUserPassword,
  };
};

export const signUp = (name, email, password, phone, isOwner) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        name,
        email,
        password,
        phone,
        isOwner
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", true, "account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // token is still valid
      dispatch(tokenStillValid(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

export const addStore = (name, image, description, country, city, address, postCode, category) => {
  return async (dispatch, getState) => {
    const { user } = selectStore(getState());
    console.log(user)
    dispatch(appLoading());
    try {
      const response = await axios.post(
        `${apiUrl}/user/${user.id}`, {
        name,
        image,
        description,
        country,
        city,
        address,
        postCode,
        category,
      });

      dispatch(storePostSuccess(response.data));
      dispatch(showMessageWithTimeout("success", true, "store created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const updateUserProfile = (name, email, password, phone, isOwner) => {
  return async (dispatch, getState) => {
    const { user } = selectStore(getState());
    console.log(user)
    dispatch(appLoading());
    const token = selectToken(getState());

    try {
      const response = await axios.patch(
        `${apiUrl}/user/${user.id}`, {
        name,
        email,
        password,
        phone,
        isOwner
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
      );

      dispatch(updateUserSuccess(response.data));
      dispatch(showMessageWithTimeout("success", true, "account updated"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const updatePassword = (password) => {
  return async (dispatch, getState) => {
    const { user } = selectStore(getState());
    console.log(user)
    dispatch(appLoading());
    const token = selectToken(getState());

    try {
      const response = await axios.patch(
        `${apiUrl}/user/${user.id}/password`,
        {
          password,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch(updatePasswordSuccess(response.data));
      dispatch(
        showMessageWithTimeout("success", true, "Password succesfully updated.")
      );
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};