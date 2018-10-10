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
// import * as fakedata from "./fakedata.json";
// import * as fakeList from "./listsfakedata.json";
import fakeListJs from "./listsfakedata.js";

//TODO : declare all functions modification here + firebase management

class App extends Component {
  //initialize state
  state = {
    lists: {},
    calendar: {},
    customLists: [],
    userIsConnect: false,
    userId: 0,
    lastResearchMade: ""
  };

  // use new file lists
  componentDidMount() {
    console.log("Mounted!");
    console.log(fakeListJs);
    // const customList=fakeListJs.filter(list=>(list.canBeErased === true))
    // console.table(customList)
    this.setState({
      lists: fakeListJs.lists,
      customLists: fakeListJs.customLists,
      calendar: {
        nameList: "calendar",
        nameIcon: "calendar"
      }
      // customLists :
    });
  }

  addToList(listId, itemId) {
    console.log(
      `log from function addToList listId : ${listId} , item id: ${itemId}`
    );
  }

  render() {
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
                addToList={this.addToList}
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
