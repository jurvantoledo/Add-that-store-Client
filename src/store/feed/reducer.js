import { 
  START_LOADING, 
  STORES_FETCHED 
} from "./actions";

const initialState = {
    loading: false,
    stores: [],
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case START_LOADING: {
        return {
          ...state,
          loading: true,
        };
      }
      case STORES_FETCHED: {
        return {
          loading: false,
          stores: [...state.stores, ...action.payload],
        };
      }

      default: {
        return state;
      }
    }
  }