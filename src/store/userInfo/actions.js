import axios from "axios";
import { apiUrl, DEFAULT_PAGINATION_LIMIT } from "../../config/constants";
import { 
  appDoneLoading, 
  appLoading, 
  setMessage, 
  showMessageWithTimeout 
} from "../appState/actions";
import { selectToken } from "../user/selectors";
import { selectUserInfo } from "./selectors";

export const USER_DETAILS_FETCHED = "USER_DETAILS_FETCHED";
export const UPDATE_STORE_SUCCESS = "UPDATE_STORE_SUCCESS"

const userDetailsFetched = user => ({
  type: USER_DETAILS_FETCHED,
  payload: user
});

export const updateStoreSuccess = (store) => {
  return {
    type: UPDATE_STORE_SUCCESS,
    payload: store,
  };
};

export const fetchUserById = id => {
    return async (dispatch, getState) => {
      const response = await axios.get(
        `${apiUrl}user/${id}`
        );
      console.log(response);
      dispatch(userDetailsFetched(response.data.user));
    };
  };

  export const updateStore = (name, image, description, country, city, address, postCode, category) => {
    return async (dispatch, getState) => {
      const [ store ] = selectUserInfo(getState());
      console.log("THIS IS STORE", store.store.id)
      const token = selectToken(getState());
      dispatch(appLoading());  
    
      try {
        const response = await axios.patch(
          `${apiUrl}store/${store.store.id}`,
          {
            name,
            image,
            description,
            country,
            city,
            address,
            postCode,
            category,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
  
        console.log("This is response", response)
  
  
        dispatch(updateStoreSuccess(response.data.user));
        dispatch(showMessageWithTimeout("success", true, "Store updated."));
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