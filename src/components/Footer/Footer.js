import React from "react";
import "./footer.css";
import { Link, withRouter } from "react-router-dom";
import IconService from "../../services/IconService";

class Footer extends React.Component {

    render() {
        const footerItems = [
          { title: "calendar", link: "/calendar"  },
          { title: "toWatchList",link:"/towatchlist" },
          { title: "archives", link: "/archives" },
          { title: "favorites", link: "/favorites" },
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
                    <Link to={footerItem.link} className={currentPath === footerItem.link? "colorTextActive c-footer__item__link__text" : ""}>
                     <span className="c-footer__item__icon">
                     <IconService nameIcon={iconName} iconStyleContext={{ color: currentPath === footerItem.link? "var(--color-active)" : "var(--iconNavColor)"}}/>
                     </span>
                     <span className={currentPath === footerItem.link? "" : "hide"}>{footerItem.title}</span>
                  </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )
    }
}
export default withRouter(Footer);
