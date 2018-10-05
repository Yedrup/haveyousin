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
import * as fakedata from "./fakedata.json";
import * as fakeList from "./listsfakedata.json";

//TODO : declare all functions modification here + firebase management

class App extends Component {
  state = {
    lists: {
      testMovies: fakedata,
      lists: fakeList.user.lists,
      toWatchList: fakeList.user.lists.toWatchList, //firebase
      archives: fakeList.user.lists.archives, //firebase
      favorites: fakeList.user.lists.favorites, //firebase []
      customLists: fakeList.user.lists.customLists, //firebase [{},{}]
      calendar: {
        nameList: "calendar",
        nameIcon: "calendar"
      } //tmdb => request 1 by day.
    }
  };

  addToWatchList(id) {
    console.log("log from function addToWatchList with id:", id);
  }

  addToArchives(id) {
    console.log("log from function addToArchives with id:", id);
  }

  addToFavorite = newItem => {
    console.log("log from function addToFavorite with id:", newItem);
    // let test = this.state.lists.favorites.results;
    //  const favorites = [ ...test.results, newItem ];
    //  this.setState({ favorites : [...favorites,newItem ] });
    //  console.log(this.state);

    //  this.setState({ toDoNotes: [...this.state.toDoNotes, newNote]})
  };

  addToCustomLists(id) {
    console.log("log from function addToCustomLists with id:", id);
  }
  componentDidMount() {
    console.log("Mounted!");
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Menu />
          <div className="content">
            <Header />
            <div className="main">
              <Router
                lists={this.state.lists.lists}
                toWatchList={this.state.lists.toWatchList}
                favorites={this.state.lists.favorites}
                archives={this.state.lists.archives}
                customLists={this.state.lists.customLists}
                calendar={this.state.lists.calendar}
                testMovies={this.state.lists.testMovies}
                addToWatchList={this.addToWatchList}
                addToArchives={this.addToArchives}
                addToFavorite={this.addToFavorite}
                addToCustomLists={this.addToCustomLists}
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
