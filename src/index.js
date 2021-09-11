import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import store from "./redux/store";
import Home from "./components/Home/Home";
import CountryPage from "./components/CountryPage/CountryPage";
import NavBar from "./components/Home/Nav/Nav";
import ActivityPage from "./components/ActivityPage/ActivityPage";
import LandingPage from "./components/LandingPage/LandingPage";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Route path="/activity" component={ActivityPage} exact></Route>
        <Route path="/country/" strict component={NavBar} />
        <Route path="/" exact component={LandingPage} />
        <Route path="/home" strict component={Home} />
        <Route path="/country/:id" exact component={CountryPage} />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
