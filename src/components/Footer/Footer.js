import React from "react";
import "./footer.css";
import { NavLink, withRouter } from "react-router-dom";
import IconService from "../../services/IconService";

class Footer extends React.Component {
  render() {
    const footerItems = [
      { title: "calendar", link: "/calendar" },
      {
        title: "toWatchList",
        link: "/list/1",
        state: this.props.lists["List1"]
      },
      {
        title: "archives",
        link: "/list/2",
        state: this.props.lists["List2"]
      },
      {
        title: "favorites",
        link: "/list/3",
        state: this.props.lists["List3"]
      },
      { title: "customLists", link: "/listHome" }
    ];
    let currentPath = this.props.location.pathname;

    return (
      <div className="c-footer">
        <ul className="c-footer__items">
          {footerItems.map(function(footerItem, index) {
            let iconName = footerItem.title;
            return (
              <li key={index}>
                <NavLink
                  to={{pathname: footerItem.link,
                    state: {
                      list: footerItem.state ? footerItem.state : ""
                    }
                  }}
                  activeStyle={{
                    color: "var(--color-active)"
                  }}
                  activeClassName="c-footer__item__link__text"
                >
                  <span className="c-footer__item__icon">
                    <IconService
                      nameIcon={iconName}
                      iconStyleContext={{
                        color:
                          currentPath === footerItem.link
                            ? "var(--color-active)"
                            : "var(--iconNavColor)"
                      }}
                    />
                  </span>
                  <span
                    className={currentPath === footerItem.link ? "" : "hide"}
                  >
                    {footerItem.title}
                  </span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
export default withRouter(Footer);
