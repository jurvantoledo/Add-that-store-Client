import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import stores from "./stores/reducer"
import countries from "./Countries/reducer"

export default combineReducers({
  appState,
  user,
  stores,
  countries,
});
