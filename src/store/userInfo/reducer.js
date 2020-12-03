import { 
  USER_DETAILS_FETCHED,
  UPDATE_STORE_SUCCESS
} from "./actions";

const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {  
    case USER_DETAILS_FETCHED:
      return [...state, {...payload}];

      case UPDATE_STORE_SUCCESS:
        return {...state, stores: {
          ...state.stores, ...payload
        } 
      };


    default:
      return state;
  }
};
