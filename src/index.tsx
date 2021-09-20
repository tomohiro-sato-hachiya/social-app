import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import Timeline from "./views/pages/Timeline";
import Login from "./views/pages/Login";
import Edit from "./views/pages/Edit";
import Email from "./views/pages/Email";
import Password from "./views/pages/Password";
import Likes from "./views/pages/Likes";
import Profile from "./views/pages/Profile";
import Follows from "./views/pages/Follows";
import reportWebVitals from "./reportWebVitals";
import HeaderPart from "./views/components/HeaderPart";
import { Route, BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <HeaderPart />
      <>
        <Route exact path="/" component={Timeline} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/edit" component={Edit} />
        <Route exact path="/email" component={Email} />
        <Route exact path="/password" component={Password} />
        <Route exact path="/likes" component={Likes} />
        <Route exact path="/profile/:uid" component={Profile} />
        <Route exact path="/follows/:uid" component={Follows} />
      </>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
