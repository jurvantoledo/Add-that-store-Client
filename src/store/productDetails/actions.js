import axios from "axios";
import { apiUrl } from "../../config/constants";

export const PRODUCT_DETAILS_FETCHED = "PRODUCT_DETAILS_FETCHED";

const productDetailsFetched = product => ({
  type: PRODUCT_DETAILS_FETCHED,
  payload: product
});

export const fetchProductById = id => {
  return async (dispatch, getState) => {
    const response = await axios.get(`${apiUrl}product/${id}`);
    dispatch(productDetailsFetched(response.data.product));
  };
};