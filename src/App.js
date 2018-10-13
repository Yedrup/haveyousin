import "normalize.css";
import { BrowserRouter } from "react-router-dom";
import React, { Component } from "react";
import Router from "./components/Router";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Menu from "./components/Menu/Menu";
import {
  setInLocalStorage,
  // getFromLocalStorage
} from "./services/localStorageService";

import "./css/App.css";
import "./css/variables.css";

import fakeState from "./listsfakedata.js";

//TODO : declare all functions modification here + firebase management

class App extends Component {
  //initialize state
  state = {
    lists: {},
    archives: {},
    toWatchList: {},
    favorites: {},
    calendar: {},
    defaultLists:[],
    customLists: [],
    userIsConnect: false,
    userId: 0,
    lastResearchMade: ""
  };

  // use new file lists
  componentDidMount() {
    console.log("Mounted!");
    console.log(fakeState);
    // const customList=fakeState.filter(list=>(list.canBeErased === true))
    // console.table(customList)
    this.setState({
      lists: fakeState.lists,
      toWatchList: fakeState.lists["List1"],
      archives: fakeState.lists["List2"],
      favorites: fakeState.lists["List3"],
      customLists: fakeState.customLists,
      defaultLists: fakeState.defaultLists,
      calendar: {
        nameList: "calendar",
        nameIcon: "calendar"
      }
    });
    
  }

  addtoCustomList = (itemId, listId) => {
    console.log(
      `log from function addtoCustomList listId : ${listId} , item id: ${itemId}`
    );

  }
   addItemToList = (itemId, listId) => {
    console.log(
      `log from function addItemToList listId : ${listId} , item id: ${itemId}`
    );
      const listToUpdate = `List${listId}`;
      const itemToAdd = itemId;
      const index = this.state.lists.find((list) => {
        return list === listToUpdate
      });
      console.log(this.state.lists[index])
      // const currentStateList = this.state.lists[listToUpdate];
      // console.log(currentStateList)
      // console.log(listToUpdate)

      // const newStateList = {...currentStateList,results: [...currentStateList.results]}
      // newStateList.rsesults.push({test:"hell yeah"})
      // console.log(newStateList.results);
      // this.setState(prevState =>({
      //   lists: {
      //     ...prevState, [list][listToUpdate][results] : newStateList
      //   }
      // }))


      // const newStateList = {
      //   ...lists,
      //   results: {
      //     ...lists.listToUpdate.results,
      //     results
      //   }
      // };
      // const FindList = listToUpdate => {
      //   // return icon.title === iconToFind
      // }
  }

  render() {
    setInLocalStorage("toWatchList", this.state.toWatchList.results);
    setInLocalStorage("archives", this.state.archives.results);
    setInLocalStorage("favorites", this.state.favorites.results);
    setInLocalStorage("lists", this.state.lists);

    return (
      <BrowserRouter>
        <div className="App">
          <Menu lists={this.state.lists} 
          customLists={this.state.customLists} />
          <div className="content">
            <Header />
            <div className="main">
              <Router
                lists={this.state.lists}
                customLists={this.state.customLists}
                calendar={this.state.calendar}
                addItemToList={this.addItemToList}
              />
            </div>
            <Footer
              lists={this.state.lists}
              customLists={this.state.customLists}
            />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
