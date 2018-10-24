import React from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import Home from "./Home/Home";
import Settings from "./Settings/Settings";
import About from "./About/About";
import Calendar from "./Calendar/Calendar";
import Details from "./Details/Details";
import ListOne from "./ListOne/ListOne";
import ListHome from "./ListHome/ListHome";
import NotFound from "./NotFound/NotFound";
import ActionPannel from "./ActionPannel/ActionPannel";

class Router extends React.Component {
  render() {
    console.log(this.props.location.pathname); // outputs currently active route
    // console.log(this.props.testMovies);
    console.log(this.props.lists?"yeah" : "nope");
    // console.log(this.props);
    // console.log(this.props.customLists);
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route
          path="/list/:listId"
          render={() => (
            <ListOne
              ActionPannel={
                <ActionPannel
                //   addItemToList={this.props.addItemToList}
                //   addToCustomList={this.props.addToCustomList}
                />
              }
            />
          )}
        />

        <Route path="/settings" component={Settings} />

        <Route
          path="/listHome"
          render={() => (
            <ListHome
              ActionPannel={
                <ActionPannel
                  // addItemToList={this.props.addItemToList}
                  // addToCustomList={this.props.addToCustomList}
                />
              }
            />
          )}
        />
        <Route
          path="/details/:contentId/:contentType"
          name="details"
          render={() => (
            <Details
              ActionPannel={
                <ActionPannel
                  // addItemToList={this.props.addItemToList}
                  // addToCustomList={this.props.addToCustomList}
                />
              }
            />
          )}
        />
         <Route
          path="/calendar"
          render={() => (
            <Calendar
              // list={this.props.calendar}
              ActionPannel={
                <ActionPannel
                // addItemToList={this.props.addItemToList}
                // addToCustomList={this.props.addToCustomList}
                />
              }
            />
          )}
        />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default withRouter(Router);
