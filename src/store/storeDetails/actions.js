import axios from "axios";
import { apiUrl } from "../../config/constants";
import { getUserWithStoredToken } from "../user/actions";
import { selectToken } from "../user/selectors";

export const STORE_DETAILS_FETCHED = "STORE_DETAILS_FETCHED";
export const PRODUCT_DELETE_SUCCESS = "RESERVATION_DELETE_SUCCESS";

export const productDeleteSuccess = userId => ({
  type: PRODUCT_DELETE_SUCCESS,
  payload: userId
});

export const storeDetailsFetched = store => ({
  type: STORE_DETAILS_FETCHED,
  payload: store
});

export const fetchStoreById = id => {
  return async (dispatch, getState) => {
    const response = await axios.get(`${apiUrl}store/${id}`);
    console.log(response);
    dispatch(storeDetailsFetched(response.data.store));
  };
};

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());

    if (token === null) return;
    try {
      const response = await axios.delete(`${apiUrl}product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("this is response", response);
      dispatch(getUserWithStoredToken());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
    }
  };
};