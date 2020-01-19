import React, { Component } from "react";
import { FOOTER_ITEMS } from "../../services/navigationService";
import { Link } from "react-router-dom";
import MediaQuery from "react-responsive";
import Truncate from "react-truncate";
import IconService from "../../services/IconService";
import "./home.css"
class Home extends Component {
  render() {
    let currentPath = this.props.location.pathname;
    return (
      <div className="c-tiles--home">
        {Object.values(FOOTER_ITEMS).map((footerItem, index) => {
          let iconName = footerItem.title;
          return (
            <Link
            key={index}
              to={
                footerItem.link
              }
            >
              <div className="c-tile--home ">
                <MediaQuery maxWidth={767}>
                  <span className="c-item__icon--small">
                    <IconService
                      nameIcon={iconName}
                      iconStyleContext={{
                        color: "var(--color-active)"
                      }}
                    />
                  </span>
                  <Truncate lines={2} ellipsis={"..."}>
                    <p className="c-tile__text">{footerItem.title}</p>
                  </Truncate>
                </MediaQuery>
                <MediaQuery minWidth={767}>
                  <span className="c-item__icon--small">
                    <IconService
                      nameIcon={iconName}
                      iconStyleContext={{
                        color: "var(--color-active)"
                      }}
                    />
                  </span>
                  <Truncate lines={4} ellipsis={"..."}>
                    <p className="c-tile__text">{footerItem.title}</p>
                  </Truncate>
                </MediaQuery>
              </div>
            </Link>
          );
        })}
      </div>
    );
  }
}

export default Home;
