import React from "react";
import "./menu.css";
import IconService from "../../services/IconService";
import { NavLink, withRouter } from "react-router-dom";
import {getCustomLists, getOneList} from "../../services/listServiceHelper";

class Menu extends React.Component {

  // //TODO : add it in helpers' functions
  // getOneList = (state, idToFound) => {
  //   let content = { ...this.props.lists.byId[idToFound] };
  //   // console.log("content from getOneList", content);
  //   return content;
  // };

  render() {
    let getToWatchList;
    let getArchiveList;
    let getFavoritesList;
    if (this.props.lists && this.props.lists.byId) {
      getToWatchList = getOneList(this.props.lists.byId, "1");
      getArchiveList = getOneList(this.props.lists.byId, "2");
      getFavoritesList = getOneList(this.props.lists.byId, "3");
    }

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
          list: getToWatchList
        }
      },
      {
        title: "archives",
        link: "/list/2",
        state: {
          list: getArchiveList
        }
      },
      {
        title: "favorites",
        link: "/list/3",
        state: {
          list: getFavoritesList
        }
      },
      {
        title: "customLists",
        link: "/listHome",
        state: {
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
    let itemsInList =  this.props.itemsInList;
    console.log("itemsInList from Menu", itemsInList)
    return (
      <div className="c-menu">
        <NavLink exact strict to={"/"}>
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
                          : "",
                      itemsInList : itemsInList
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
                          : "var(--iconNavColor)"
                    }}
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
