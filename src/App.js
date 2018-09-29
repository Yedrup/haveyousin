import "normalize.css";
import { BrowserRouter } from "react-router-dom";
import React, { Component } from "react";
import Router from "./components/Router";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Menu from "./components/Menu/Menu";

import "./css/App.css";
import "./css/variables.css";

//fakedata
import * as fakedata from './fakedata.json';
import * as fakeList from './listsfakedata.json';

class App extends Component {
  state = {
    lists : {
      testMovies: fakedata,
      lists: fakeList.user.lists,
      toWatchList: fakeList.user.lists.toWatchList,//firebase
      archives: fakeList.user.lists.archives,//firebase
      favorites: fakeList.user.lists.favorites,//firebase
      customLists: fakeList.user.lists.customLists, //firebase
      calendar: {
      "nameList": "calendar",
      "nameIcon": "calendar"} //tmdb => request 1 by day.
    }
  };

  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Menu />
        <div className="content">
          <Header  />
          <div className="main">  
            <Router lists={this.state.lists.lists} 
              toWatchList={this.state.lists.toWatchList}
             favorites={this.state.lists.favorites}
             archives={this.state.lists.archives}
             customLists={this.state.lists.customLists}
             calendar={this.state.lists.calendar}
             testMovies={this.state.lists.testMovies}
             />
          </div>
          <Footer />
        </div>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
