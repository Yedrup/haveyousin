import React from "react";
import MediaQuery from "react-responsive";
import IconService from "../../services/IconService";

import { getSearchResults } from "../../services/tmdbService";
import "./search.css";
import { CSSTransition } from "react-transition-group";
import Results from "../Results/Results";

class Search extends React.Component {
  state = {
    currentSearch: "",
    currentSearchResults: []
  };

  goToResultPage = () => {
    console.log("go to result page");
  };

  clearResults = () => {
    this.setState({
      currentSearchResults: [],
      currentSearch : ""
    });
  }

  saveSearchResults = results => {
    // console.log(results);
    let currentResults = results;
    this.setState({
      currentSearchResults: currentResults
    });
  };

  handleChange = async event => {

    let search = event.target.value;
    this.setState({
      currentSearch: search
    });
    let results = await getSearchResults(search);
    if (!results || !search) {
      this.setState({
        currentSearchResults: []
      });
    } else if (results && results.results.length > 0) {
      results = results.results;
      this.saveSearchResults(results);
    } else if (results && results.results.length === 0) {
      console.log("no sins related to your choice :(");
    }
  };
  componentWillUnmount() {
    if(this.props.isSearchFieldOpenSmallDevice && this.props.isSearchFieldOpenSmallDevice === false) {
      this.clearResults()
    }

  }

  render() {
    const isSearchFieldOpenSmallDevice = this.props.isSearchFieldOpenSmallDevice;
    const searchBarMobileField = this.props.searchBarMobileField;
    // console.log("isSearchFieldOpenSmallDevice", isSearchFieldOpenSmallDevice);

    if (!searchBarMobileField) {
      return (
        <span className="c-search">
          <div className="c-search__input-block">
            <input
              type="search"
              placeholder="Search a movie, a serie, an actor"
              className="c-search-field"
              onChange={this.handleChange}
              value = {this.state.currentSearch}
            />
             <span onClick={this.goToResultPage}>
                <IconService
                  nameIcon={"search"}
                  iconStyleContext={{ color: "var(--color-silver)" }}
                />
              </span>
          </div>
          <div className="c-header__results--desktop">
          <Results clearResults={this.clearResults} currentResults={this.state.currentSearchResults} />
          </div>
        </span>
      );
    } else {
      return (
        <MediaQuery maxWidth={1024}>
        <div className="c-search-input-results--small">
          <CSSTransition
            classNames="c-search-field--small"
            timeout={{ enter: 500, exit: 500 }}
            in={isSearchFieldOpenSmallDevice}
            unmountOnExit
          >
            <input
              type="search"
              placeholder="Search a movie, a serie, an actor"
              className="c-search-field--small"
              onChange={this.handleChange}
              value = {this.state.currentSearch}
              autoFocus={isSearchFieldOpenSmallDevice}
            />
          </CSSTransition>
          <Results isSearchFieldOpenSmallDevice={isSearchFieldOpenSmallDevice} clearResults={this.clearResults} currentResults={this.state.currentSearchResults} />
          </div>
        </MediaQuery>
      );
    }
  }
}

export default Search;
