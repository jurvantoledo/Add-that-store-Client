import axios from "axios";
import { apiUrl } from "../../config/constants";
import { appDoneLoading, appLoading, setMessage, showMessageWithTimeout } from "../appState/actions";
import { selectStoreDetails } from "../storeDetails/selectors";
import { selectStore, selectToken } from "../user/selectors";
import { selectUserInfo } from "./selectors";

export const USER_DETAILS_FETCHED = "USER_DETAILS_FETCHED";

const userDetailsFetched = user => ({
  type: USER_DETAILS_FETCHED,
  payload: user
});

export const fetchUserById = id => {
    return async (dispatch, getState) => {
      const response = await axios.get(`${apiUrl}/user/${id}`);
      console.log(response);
      dispatch(userDetailsFetched(response.data.user));
    };
  };