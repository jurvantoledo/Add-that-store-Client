import { 
  LOG_OUT, 
  LOGIN_SUCCESS, 
  TOKEN_STILL_VALID, 
  STORE_POST_SUCCESS,
  UPDATE_USER_SUCCESS,
  UPDATE_PASSWORD_SUCCESS
} from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
};

export default (state = initialState, action) => {
  switch (action.type) {

    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };

    case LOG_OUT:
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };

      case STORE_POST_SUCCESS:
        return {
          ...state,
          store: {
            ...state.store, 
            ...action.payload
          }
        };

      case UPDATE_USER_SUCCESS:
       return { ...state, ...action.payload };

    case UPDATE_PASSWORD_SUCCESS:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
