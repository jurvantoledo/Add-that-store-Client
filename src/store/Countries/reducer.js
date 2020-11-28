import { FETCH_COUNTRIES_SUCCES } from "./actions";

const initialState = []



export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_COUNTRIES_SUCCES:
        return [...state, action.payload];

      default:
        return state;
    }
  }