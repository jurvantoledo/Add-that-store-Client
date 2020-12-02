import { 
  FETCH_STORES_SUCCES, 
  PRODUCT_POST_SUCCESS, 
  UPDATE_STORE_SUCCESS
} from "./actions";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STORES_SUCCES:
      return [...state, ...action.payload];

      case PRODUCT_POST_SUCCESS:
        return {
          ...state,
          store: {
            ...state.store, 
            ...action.payload
          }
        };

      case UPDATE_STORE_SUCCESS:
       return { ...state, ...action.payload };

    default:
      return state;
  }
};