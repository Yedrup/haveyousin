import { BrowserRouter } from 'react-router-dom';
import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import { Provider } from 'mobx-react';
import { createBrowserHistory } from 'history';
import Router from './components/Router';
import Header from './components/Header/Header';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Footer from './components/Footer/Footer';
import Menu from './components/Menu/Menu';
import NewMenu from './components/Menu/NewMenu';

import 'normalize.css';
import './css/App.css';
import './css/variables.css';

import listsStore from './stores/ListsStore';
import itemsStore from './stores/ItemsStore';

//TODO : declare all functions modification here + firebase management
// console.log("navigator online?", navigator.onLine)
const history = createBrowserHistory();

// detect use of tab to display outline.
function handleFirstTab(e) {
  // console.log("e", e)
  if (e.keyCode === 9) {
    document.body.classList.add('user-is-tabbing');
    window.removeEventListener('keydown', handleFirstTab);
  }
}
window.addEventListener('keydown', handleFirstTab);

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
    return (
      <BrowserRouter basename="/haveyousin">
        <Provider ListsStore={listsStore} ItemsStore={itemsStore}>
          <div className="App">
            <ScrollToTop />
            <MediaQuery maxWidth={1024}>
              <NewMenu />
            </MediaQuery>
            <MediaQuery minWidth={1024}>
              <Menu />
            </MediaQuery>
            <div className="content">
              <Header />
              <main className="main">
                <Router history={history} />
              </main>
              <Footer />
            </div>
          </div>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
