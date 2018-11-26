import "normalize.css";
import { BrowserRouter } from "react-router-dom";
import React, { Component } from "react";
import { Provider } from "mobx-react";
import Router from "./components/Router";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Menu from "./components/Menu/Menu";
import NewMenu from "./components/Menu/NewMenu";
import MediaQuery from "react-responsive";

import "./css/App.css";
import "./css/variables.css";

// import fakeState from "./listsfakedata.newpattern.js";
import listsStore from "./stores/ListsStore";
import itemsStore from "./stores/ItemsStore";

//TODO : declare all functions modification here + firebase management

class App extends Component {
  componentDidMount() {}

  addToCustomList = (itemId, listId) => {
    console.log(
      `log from function addToCustomList listId : ${listId} , item id: ${itemId}`
    );
  };
  addItemToList = (itemId, listId) => {
    console.log(
      `log from function addItemToList listId : ${listId} , item id: ${itemId}`
    );
  };

  render() {
    console.log(listsStore);
    return (
      <BrowserRouter   basename={"/playground/pwa"}      >
        <Provider ListsStore={listsStore} ItemsStore={itemsStore}>
          <div className="App">
            {/* <Menu /> */}
            <MediaQuery maxWidth={1024}>
              <NewMenu />
            </MediaQuery>
            <MediaQuery minWidth={1024}>
              <Menu />
            </MediaQuery>
            <div className="content">
              <Header />
              <div className="main">
                <Router />
              </div>
              <Footer />
            </div>
          </div>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
