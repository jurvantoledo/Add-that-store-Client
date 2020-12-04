import { 
  USER_DETAILS_FETCHED,
} from "./actions";

const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {  
    case USER_DETAILS_FETCHED:
    let index = state.findIndex(store => store.store_id === payload.store_id);

    if(index === -1)
      return [...state, {...payload}];


    default:
      return state;
  }
};
