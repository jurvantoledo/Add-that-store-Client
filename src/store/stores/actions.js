import { apiUrl, DEFAULT_PAGINATION_LIMIT } from "../../config/constants";
import axios from "axios";
import { 
    appDoneLoading, 
    appLoading, 
    setMessage, 
    showMessageWithTimeout 
} from "../appState/actions";
import { selectStoreDetails } from "../storeDetails/selectors";

export const FETCH_STORES_SUCCES = "FETCH_STORES_SUCCES"
export const PRODUCT_POST_SUCCESS = "PRODUCT_POST_SUCCESS";

export const fetchStoresSucces = stores => ({
    type: FETCH_STORES_SUCCES,
    payload: stores
})

export const productPostSuccess = store => ({
    type: PRODUCT_POST_SUCCESS,
    payload: store
  });

export const fetchStores = () => {
    return async (dispatch, getState) => {
    const storeCount = getState().stores.length;
    const response = await axios.get(
        `${apiUrl}store?limit=${DEFAULT_PAGINATION_LIMIT}&offset=${storeCount}`
    );
      
          dispatch(fetchStoresSucces(response.data.stores.rows));
    };
};

export const addProduct = (name, image, description) => {
    return async (dispatch, getState) => {
      const { id } = selectStoreDetails(getState());
      console.log(id)
      dispatch(appLoading());
      try {
        const response = await axios.post(
          `${apiUrl}store/${id}`, {
          name,
          image,
          description
        });
  
        dispatch(productPostSuccess(response.data));
        dispatch(showMessageWithTimeout("success", true, "product created"));
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