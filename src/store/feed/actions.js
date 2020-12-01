import { apiUrl, DEFAULT_PAGINATION_LIMIT } from "../../config/constants";
import axios from "axios";

export function startLoading() {
  return {
    type: "feed/startLoading",
  };
}

export function storesFetched(stores) {
  return {
    type: "feed/storesFetched",
    payload: stores,
  };
}

export const fetchNext5Stores = () => {
    return async (dispatch, getState) => {
    const storeCount = getState().stores.length;
    const response = await axios.get(
        `${apiUrl}/store?limit=${DEFAULT_PAGINATION_LIMIT}&offset=${storeCount}`
      );
      
      const moreStores = response.data.stores.rows;
  
      dispatch(storesFetched(moreStores));
      dispatch(startLoading);
      console.log("AAAAHHHH",moreStores);
    };
};