import { apiUrl } from "../../config/constants";
import axios from "axios";

export const FETCH_STORES_SUCCES = "FETCH_STORES_SUCCES"

export const fetchStoresSucces = stores => ({
    type: FETCH_STORES_SUCCES,
    payload: stores
})

export const fetchStores = () => {
    return async (dispatch, getState) => {
    const response = await axios.get(
        `${apiUrl}/store`
    );
      
          console.log(response.data);
          dispatch(fetchStoresSucces(response.data.stores.rows));
    };
};