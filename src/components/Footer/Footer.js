import React from "react";
import "./footer.css";
import { NavLink, withRouter } from "react-router-dom";
import IconService from "../../services/IconService";
import {getOneList} from "../../services/listServiceHelper";

class Footer extends React.Component {
  render() {
    let getToWatchList;
    let getArchiveList;
    let getFavoritesList;
    if (this.props.lists && this.props.lists.byId) {
      getToWatchList = getOneList(this.props.lists.byId, "1");
      getArchiveList = getOneList(this.props.lists.byId, "2");
      getFavoritesList = getOneList(this.props.lists.byId, "3");
    }
    const footerItems = [
      { title: "calendar", link: "/calendar" },
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
      }
    ];
    let currentPath = this.props.location.pathname;
    let itemsInList =  this.props.itemsInList
    return (
      <div className="c-footer">
        <ul className="c-footer__items">
          {footerItems.map(function(footerItem, index) {
            let iconName = footerItem.title;
            return (
              <li key={index}>
                <NavLink
                  to={{
                    pathname: footerItem.link,
                    state: {
                      list: footerItem.state && footerItem.state.list? footerItem.state.list : "",
                      itemsInList : itemsInList
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
