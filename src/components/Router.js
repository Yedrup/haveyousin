import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home/Home";
// import Account from "./Account/Account";
import About from "./About/About";
import ListOne from "./ListOne/ListOne";
import NotFound from "./NotFound/NotFound";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/list/:userId/:listId" component={ListOne} />
      {/* <Route path="/account/:userId" component={Account} /> */}
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>);

export default Router;
