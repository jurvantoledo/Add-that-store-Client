import React, { useEffect } from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import AddStore from "./pages/AddStore"
import Stores from "./pages/Stores"
import StoreDetails from "./pages/StoreDetails";
import AddProduct from "./pages/AddProduct"
import StoreInfo from "./pages/StoreInfo"


import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";
import { Jumbotron } from "react-bootstrap";
import ProductDetails from "./pages/ProductDetails";
import UpdateStore from "./pages/UpdateStore";

const Home = () => (
  <Jumbotron>
    <h1>Home</h1>
  </Jumbotron>
);
const Other = () => (
  <Jumbotron>
    <h1>Other</h1>
  </Jumbotron>
);

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Switch>
        <Route exact path="/" component={Stores} />
        <Route path="/add-store" component={AddStore} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/store/:id" component={StoreDetails} />
        <Route path="/product/:id" component={ProductDetails} />
        <Route path="/add-product" component={AddProduct} />
        <Route path="/info/:id" component={StoreInfo} />
        <Route path="/update-store/:id" component={UpdateStore} />
      </Switch>
    </div>
  );
}

export default App;
