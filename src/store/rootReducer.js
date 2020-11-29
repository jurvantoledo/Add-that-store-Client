import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import stores from "./stores/reducer"
import storeDetails from "./storeDetails/reducer";

export default combineReducers({
  appState,
  user,
  stores,
  storeDetails,
});
