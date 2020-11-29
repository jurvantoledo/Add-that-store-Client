import { STORE_DETAILS_FETCHED } from "./actions";

const initialState = {
  products: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {  
    case STORE_DETAILS_FETCHED:
      return { ...state, ...payload };

    default:
      return state;
  }
};
