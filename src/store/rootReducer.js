import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import stores from "./stores/reducer"
import storeDetails from "./storeDetails/reducer";
import productDetails from "./productDetails/reducer"
import userInfo from "./userInfo/reducer"
import feed from "./feed/reducer"

export default combineReducers({
  appState,
  user,
  stores,
  storeDetails,
  productDetails,
  userInfo,
  feed
});
