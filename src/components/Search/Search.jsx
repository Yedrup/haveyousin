import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import { CSSTransition } from 'react-transition-group';
import IconService from '../../services/IconService';
import { getSearchResults } from '../../services/tmdbService';
import Results from '../Results/Results';
import './search.css';

class Search extends Component {
  state = {
    currentSearch: '',
    currentSearchResults: [],
  };

  goToResultPage = () => {
    console.log('go to result page');
  };

  clearResults = () => {
    this.setState({
      currentSearchResults: [],
      currentSearch: '',
    });
  };

  saveSearchResults = (results) => {
    this.setState({
      currentSearchResults: results,
    });
  };

  handleChange = async (event) => {
    let search = event.target.value;
    this.setState({
      currentSearch: search,
    });
    let results = await getSearchResults(search);
    if (!results || !search) {
      this.setState({
        currentSearchResults: [],
      });
      // TODO: change results.results
    } else if (results && results.results.length > 0) {
      results = results.results;
      this.saveSearchResults(results);
    } else if (results && results.results.length === 0) {
      console.log('no sins related to your choice :(');
    }
  };
  componentWillUnmount() {
    let { isSearchFieldOpenSmallDevice } = this.props;
    if (
      isSearchFieldOpenSmallDevice &&
      isSearchFieldOpenSmallDevice === false
    ) {
      this.clearResults();
    }
  }

  render() {
    const { searchBarMobileField, isSearchFieldOpenSmallDevice } = this.props;

    if (!searchBarMobileField) {
      return (
        <span className="c-search">
          <div className="c-search__input-block">
            <input
              type="search"
              placeholder="Search a movie, a serie, an actor"
              className="c-search-field"
              onChange={this.handleChange}
              value={this.state.currentSearch}
            />
            <span onClick={this.goToResultPage}>
              <IconService
                nameIcon={'search'}
                iconStyleContext={{ color: 'var(--color-silver)' }}
              />
            </span>
          </div>
          <div className="c-header__results--desktop">
            <Results
              clearResults={this.clearResults}
              currentResults={this.state.currentSearchResults}
            />
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
                value={this.state.currentSearch}
                autoFocus={isSearchFieldOpenSmallDevice}
              />
            </CSSTransition>
            <Results
              isSearchFieldOpenSmallDevice={isSearchFieldOpenSmallDevice}
              clearResults={this.clearResults}
              currentResults={this.state.currentSearchResults}
            />
          </div>
        </MediaQuery>
      );
    }
  }
}

export default Search;
