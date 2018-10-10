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
    // console.log(this.props.toWatchList);
    // console.log(this.props.customLists);
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route
          path="/list/:listId"
          render={() => (
            <ListOne
            // lists={this.props.lists}
              ActionPannel={
                <ActionPannel
                  // addToWatchList={this.props.addToWatchList}
                  // addToArchives={this.props.addToArchives}
                  // addToFavorite={this.props.addToFavorite}
                  // addToCustomLists={this.props.addToCustomLists}
                  addToList={this.props.addToList}
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
              // customLists={this.props.customLists}
              ActionPannel={
                <ActionPannel
                  // addToWatchList={this.props.addToWatchList}
                  // addToArchives={this.props.addToArchives}
                  // addToFavorite={this.props.addToFavorite}
                  // addToCustomLists={this.props.addToCustomLists}
                  addToList={this.props.addToList}
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
                  // addToWatchList={this.props.addToWatchList}
                  // addToArchives={this.props.addToArchives}
                  // addToFavorite={this.props.addToFavorite}
                  // addToCustomLists={this.props.addToCustomLists}
                  addToList={this.props.addToList}

                />
              }
            />
          )}
        />
         <Route
          path="/calendar"
          render={() => (
            <Calendar
              list={this.props.calendar}
              ActionPannel={
                <ActionPannel
                addToList={this.props.addToList}

                  // addToWatchList={this.props.addToWatchList}
                  // addToArchives={this.props.addToArchives}
                  // addToFavorite={this.props.addToFavorite}
                  // addToCustomLists={this.props.addToCustomLists}
                />
              }
            />
          )}
        />
        <Route component={NotFound} />
        {/* <Route
          path="/favorites"
          render={() => (
            <ListOne
              list={this.props.favorites}
              ActionPannel={
                <ActionPannel
                  addToWatchList={this.props.addToWatchList}
                  addToArchives={this.props.addToArchives}
                  addToFavorite={this.props.addToFavorite}
                  addToCustomLists={this.props.addToCustomLists}
                />
              }
            />
          )}
        />
        <Route
          path="/towatchlist"
          render={() => (
            <ListOne
              list={this.props.toWatchList}
              results={this.props.toWatchList.results}
              iconName={this.props.toWatchList.iconName}
              ActionPannel={
                <ActionPannel
                  addToWatchList={this.props.addToWatchList}
                  addToArchives={this.props.addToArchives}
                  addToFavorite={this.props.addToFavorite}
                  addToCustomLists={this.props.addToCustomLists}
                />
              }
            />
          )}
        />
        <Route
          path="/archives"
          render={() => (
            <ListOne
              list={this.props.archives}
              ActionPannel={
                <ActionPannel
                  addToWatchList={this.props.addToWatchList}
                  addToArchives={this.props.addToArchives}
                  addToFavorite={this.props.addToFavorite}
                  addToCustomLists={this.props.addToCustomLists}
                />
              }
            />
          )}
        /> */}
      </Switch>
    );
  }
}

export default withRouter(Router);
