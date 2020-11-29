import axios from "axios";
import { apiUrl } from "../../config/constants";

export const STORE_DETAILS_FETCHED = "STORE_DETAILS_FETCHED";

const storeDetailsFetched = store => ({
  type: STORE_DETAILS_FETCHED,
  payload: store
});

export const fetchStoreById = id => {
  return async (dispatch, getState) => {
    const response = await axios.get(`${apiUrl}/store/${id}`);
    console.log(response);
    dispatch(storeDetailsFetched(response.data.store));
  };
};