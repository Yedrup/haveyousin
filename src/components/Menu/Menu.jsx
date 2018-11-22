import React from "react";
import "./menu.css";
import IconService from "../../services/IconService";
import { NavLink, withRouter } from "react-router-dom";
import {MENU_ITEMS} from "../../services/navigationService";
class Menu extends React.Component {
  render() {
    let currentPath = this.props.location.pathname;
    return (
      <div className="c-menu">
        <NavLink exact strict to={"/"}>
          <h1 className="c-logo c-logo--menu"> HaveYouSin </h1>
        </NavLink>
        <ul className="c-menu__items">
          {Object.values(MENU_ITEMS).map((menuItem, index) => {
            console.log("menuItem", menuItem )
            let iconName = menuItem.title;
            return (
              <li key={index}>
                <NavLink
                  exact
                  strict
                  to={{
                    pathname: menuItem.link
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
