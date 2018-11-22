import React from "react";
import "./menu.css";
import IconService from "../../services/IconService";
import { NavLink, withRouter } from "react-router-dom";
import { slide as YeahMenu } from "react-burger-menu";
import {MENU_ITEMS} from "../../services/navigationService";

class NewMenu extends React.Component {
  render() {

    let currentPath = this.props.location.pathname;
    return (
      <YeahMenu role="navigation">
        <NavLink exact strict to={"/"}>
          <h1 className="c-logo c-logo--menu"> HaveYouSin </h1>
        </NavLink>
        <ul className="c-menu__items">
        {Object.values(MENU_ITEMS).map((menuItem, index) => {
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
      </YeahMenu>
    );
  }
}

export default withRouter(NewMenu);
