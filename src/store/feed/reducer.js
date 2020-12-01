const initialState = {
    loading: false,
    stores: [],
  };
  
  export default function feedSliceReducer(state = initialState, action) {
    switch (action.type) {
      case "feed/startLoading": {
        return {
          ...state,
          loading: true,
        };
      }
      case "feed/storesFetched": {
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