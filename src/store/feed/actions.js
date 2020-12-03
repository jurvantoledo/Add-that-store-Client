import { apiUrl, DEFAULT_PAGINATION_LIMIT } from "../../config/constants";
import axios from "axios";
import { appDoneLoading } from "../appState/actions";

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

export const fetchNext5Stores = (stores) => {
    return async (dispatch, getState) => {
      dispatch(startLoading);
      const response = await axios.get(
        `${apiUrl}store?limit=${DEFAULT_PAGINATION_LIMIT}&offset=${stores.length}`
      );
  
      const moreStores = response.data.stores.rows;
  
      dispatch(storesFetched(moreStores));
      dispatch(appDoneLoading)
      console.log("More STORES", moreStores);
    };
};