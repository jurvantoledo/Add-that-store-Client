import { FETCH_STORES_SUCCES } from "./actions";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STORES_SUCCES:
      return [...state, ...action.payload];

    default:
      return state;
  }
};