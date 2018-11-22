import React from "react";
import "./footer.css";
import { NavLink, withRouter } from "react-router-dom";
import IconService from "../../services/IconService";
import {FOOTER_ITEMS} from "../../services/navigationService";

class Footer extends React.Component {
  render() {
    let currentPath = this.props.location.pathname;
    return (
      <div className="c-footer">
        <ul className="c-footer__items">
        {Object.values(FOOTER_ITEMS).map((footerItem, index) => {
            let iconName = footerItem.title;
            return (
              <li key={index}>
                <NavLink
                  to={{
                    pathname: footerItem.link
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
