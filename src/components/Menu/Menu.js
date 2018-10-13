import React from "react";
import "./menu.css";
import IconService from "../../services/IconService";
import { NavLink, withRouter } from "react-router-dom";

class Menu extends React.Component {
  componentDidMount() {
    let test = this.props.lists;
    console.log("test", test);
  }

  render() {
    // console.log(this.props.lists);
    const menuItems = [
      {
        title: "home",
        link: "/"
      },
      {
        title: "calendar",
        link: "/calendar"
      },
      {
        title: "toWatchList",
        link: "/list/1",
        state: {
          list: this.props.lists["List1"]
        }
      },
      {
        title: "archives",
        link: "/list/2",
        state: {
          list: this.props.lists["List2"]
        }
      },
      {
        title: "favorites",
        link: "/list/3",
        state: {
          list: this.props.lists["List3"]
        }
        // ,
        // state: this.props.favorites
      },
      {
        title: "customLists",
        link: "/listHome",
        state: {
          customLists: this.props.customLists,
          list: this.props.lists
        }
      },
      {
        title: "user",
        link: "/settings"
      },
      {
        title: "about",
        link: "/about"
      }
    ];
    // console.log(this.props.location.pathname); // outputs currently active route
    let currentPath = this.props.location.pathname;
    return (
      <div className="c-menu">
        <NavLink
          exact
          strict
          to={"/"}
        >
          <h1 className="c-logo c-logo--menu"> HaveYouSin </h1>
        </NavLink>
        <ul className="c-menu__items">
          {menuItems.map(function(menuItem, index) {
            let iconName = menuItem.title;
            return (
              <li key={index}>
                <NavLink
                  exact
                  strict
                  to={{
                    pathname: menuItem.link,
                    state: {
                      list:
                        menuItem.state && menuItem.state.list
                          ? menuItem.state.list
                          : "",
                      customLists:
                        menuItem.state && menuItem.state.customLists
                          ? menuItem.state.customLists
                          : ""
                    }
                  }}
                  activeStyle={{
                    color: "var(--color-active)"
                  }}
                  className={"c-menu__item__link__text c-menu__item"}
                >
                  <IconService
                    nameIcon={iconName}
                    iconStyleContext={{
                      color:
                      currentPath === menuItem.link
                        ? "var(--color-active)"
                        : "var(--iconNavColor)"                    }}
                  />
                  <span className="c-menu__item__title">{menuItem.title}</span>
                </NavLink>
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
