import React from 'react';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router-dom';
import IconService from '../../services/IconService';
import Search from '../Search/Search';
import './header.css';
class Header extends React.Component {
  state = {
    isSearchFieldOpenSmallDevice: false,
  };
  openSearchOnSmall = () => {
    this.setState({
      isSearchFieldOpenSmallDevice: !this.state.isSearchFieldOpenSmallDevice,
    });
  };

  render() {
    const { isSearchFieldOpenSmallDevice } = this.state;
    return (
      <header className="c-header">
        <div className="c-header__main">
          <MediaQuery maxWidth={1024}>
            <Link to={'/'}>
              <h1 className="c-logo c-logo--header ">HaveYouSin</h1>
            </Link>
            <div className="c-header__search">
              <span onClick={this.openSearchOnSmall}>
                <IconService
                  nameIcon={'search'}
                  iconStyleContext={{ color: 'var(--color-silver)' }}
                />
              </span>
              <Search
                openSearchOnSmall={this.openSearchOnSmall}
                searchBarMobileField={true}
                isSearchFieldOpenSmallDevice={isSearchFieldOpenSmallDevice}
              />
            </div>
          </MediaQuery>
          <MediaQuery minWidth={1024}>
            <div className="c-header__search">
              <Search searchBarMobileField={false} />
            </div>
          </MediaQuery>
        </div>
      </header>
    );
  }
}

export default Header;
