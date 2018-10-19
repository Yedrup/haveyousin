import "normalize.css";
import { BrowserRouter } from "react-router-dom";
import React, { Component } from "react";
import Router from "./components/Router";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Menu from "./components/Menu/Menu";
import {
  setInLocalStorage
  // getFromLocalStorage
} from "./services/localStorageService";

import "./css/App.css";
import "./css/variables.css";

import fakeState from "./listsfakedata.newpattern.js";

//TODO : declare all functions modification here + firebase management

class App extends Component {
  //initialize state
  state = {
    lists: {},
    itemsInList: {},
    calendar: {},
    userIsConnect: false,
    userId: 0,
    lastResearchMade: ""
  };

  // use new file lists
  componentDidMount() {
    // console.log("Mounted!");
    // console.log(fakeState);
    // const customList=fakeState.filter(list=>(list.canBeErased === true))
    // console.table(customList)
    this.setState({
      lists: fakeState.lists,
      itemsInList: fakeState.itemsInList,
      calendar: {
        nameList: "calendar",
        nameIcon: "calendar"
      }
    });
  }

  addToCustomList = (itemId, listId) => {
    console.log(
      `log from function addToCustomList listId : ${listId} , item id: ${itemId}`
    );
  };
  addItemToList = (itemId, listId) => {
    console.log(
      `log from function addItemToList listId : ${listId} , item id: ${itemId}`
    );
    // const listToUpdate = listId;
    // const itemToAdd = itemId;
    // const index = this.state.lists.find(list => {
    //   return list === listToUpdate;
    // });
    // console.log(this.state.lists[index]);
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
    // }
  };

  render() {
    const {lists,itemsInList} = this.state;
    console.log("this.state", this.state);
    return (
      <BrowserRouter>
        <div className="App">
          <Menu 
          lists={lists}
          itemsInList={itemsInList}
          />
          <div className="content">
            <Header />
            <div className="main">
              <Router
                lists={lists}
                calendar={this.state.calendar}
                addItemToList={this.addItemToList}
                addToCustomList={this.addToCustomList}
              />
            </div>
            <Footer
              lists={lists}
              itemsInList={itemsInList}
            />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
