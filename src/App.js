import "normalize.css";
import React, { Component } from "react";
import Router from "./components/Router";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Menu from "./components/Menu/Menu";

import "./css/App.css";
import "./css/variables.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Menu />
        <div className="content">
          <Header />
          <div className="main">
            <Router />
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
