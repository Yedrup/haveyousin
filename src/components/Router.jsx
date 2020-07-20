import React, { Component } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import Home from './Home/Home';
import Settings from './Settings/Settings';
import About from './About/About';
import Calendar from './Calendar/Calendar';
import Details from './Details/Details';
import ListOne from './ListOne/ListOne';
import ListHome from './ListHome/ListHome';
import NotFound from './NotFound/NotFound';
import ActionPanel from './ActionPanel/ActionPanel';

class Router extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route
          path="/list/:listId"
          render={() => <ListOne ActionPanel={<ActionPanel />} />}
        />

        <Route path="/settings" component={Settings} />

        <Route
          path="/listHome"
          render={() => <ListHome ActionPanel={<ActionPanel />} />}
        />
        <Route
          path="/details/:contentId/:contentType"
          name="details"
          render={() => <Details ActionPanel={<ActionPanel />} />}
        />
        <Route
          path="/calendar"
          render={() => <Calendar ActionPanel={<ActionPanel />} />}
        />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default withRouter(Router);
