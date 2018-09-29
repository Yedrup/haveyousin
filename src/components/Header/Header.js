import React from "react";
import "./header.css";
import IconService from "../../services/IconService";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
import MediaQuery from "react-responsive";

class Header extends React.Component {
  state = {
    isSearchFieldOpenSmallDevice: false
  };
  openSearchOnSmall = () => {
    console.log("test from search small");
    this.setState({
      isSearchFieldOpenSmallDevice: !this.state.isSearchFieldOpenSmallDevice
    });
  };
  openMenu = () => {
    console.log("test");
  };

  render() {
    const { isSearchFieldOpenSmallDevice } = this.state;
    return (
      <header className="c-header">
        <div className="c-header__main">
          <MediaQuery maxWidth={1024}>
            <span onClick={this.openMenu}>
              <IconService
                  nameIcon={"menu"}
                  iconStyleContext={{ color: "var(--color-silver)", className: "c-header__menu-icon" }}
                />
            </span>
            <Link to={"/"}>
              <h1 className="c-logo c-logo--header ">HaveYouSin</h1>
            </Link>
            <div className="c-header__search">
              <span onClick={this.openSearchOnSmall}>
                <IconService
                  nameIcon={"search"}
                  iconStyleContext={{ color: "var(--color-silver)" }}
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
              <Search
                searchBarMobileField={false}
              />
            </div>
          </MediaQuery>
        </div>
      </header>
    );
  }
}

export default Header;
