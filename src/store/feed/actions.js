import { apiUrl, DEFAULT_PAGINATION_LIMIT } from "../../config/constants";
import axios from "axios";
import { appDoneLoading } from "../appState/actions";

export const START_LOADING = "START_LOADING"
export const STORES_FETCHED = "STORES_FETCHED"

export function startLoading() {
  return {
    type: START_LOADING,
  };
}

export function storesFetched(stores) {
  return {
    type: STORES_FETCHED,
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