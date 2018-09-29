import React from "react";
import "./menu.css";
import IconService from "../../services/IconService";
import { Link, withRouter } from "react-router-dom";

class Menu extends React.Component {
  render() {
    const menuItems = [
      { title: "home", link: "/" },
      { title: "calendar", link: "/calendar" },
      { title: "toWatchList", link: "/toWatchList" },
      { title: "favorites", link: "/favorites" },
      { title: "archives", link: "/archives" },
      { title: "customLists", link: "/listHome" },
      { title: "user", link: "/settings" },
      { title: "about", link: "/about" }
    ];
    // console.log(this.props.location.pathname); // outputs currently active route
    let currentPath = this.props.location.pathname;
    return (
      <div className="c-menu">
        <Link to={"/"}>
          <h1 className="c-logo c-logo--menu">HaveYouSin</h1>
        </Link>
        <ul className="c-menu__items">
          {menuItems.map(function(menuItem, index) {
            let iconName = menuItem.title;
            return (
              <li key={index}>
                <Link
                  to={menuItem.link}
                  className={
                    currentPath === menuItem.link
                      ? "colorTextActive c-menu__item"
                      : "c-menu__item__link__text c-menu__item"
                  }
                >
                  <IconService
                    nameIcon={iconName}
                    iconStyleContext={{
                      color:
                        currentPath === menuItem.link
                          ? "var(--color-active)"
                          : "var(--iconNavColor)"
                    }}
                  />
                  <span className="c-menu__item__title">{menuItem.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <IconService
          nameIcon="close"
          iconStyleContext={{
            className: "c-menu__button",
            color: "var(--button-close-color)"
          }}
        />
      </div>
    );
  }
}

export default withRouter(Menu);
