
import React from "react";
import "./menu.css";
import { IconContext } from "react-icons";
import {  FaTimesCircle,
    FaCalendar,
    FaHome,
    FaHeart,
    FaBookmark,
    FaList,
    FaUser
 } from 'react-icons/fa';


class Menu extends React.Component {
    render() {
        const menuItems = [
          { title: "calendar", nameIcon: FaCalendar },
          { title: "home", nameIcon: FaHome },
          { title: "favorites", nameIcon: FaHeart },
          { title: "archives", nameIcon: FaBookmark },
          { title: "customLists", nameIcon: FaList },
          { title: "settings", nameIcon: FaUser }
        ];
        return (
          <div className="c-menu">
            <h2>Menu</h2>
            <ul className="c-menu_items">
              {menuItems.map(function(menuItem, index) {
                  let IconName = menuItem.nameIcon;
                return (
                  <li key={index}>
                      <IconContext.Provider value={{ color: "var(--color-silver)"}}>
                     <IconName  />
                     </IconContext.Provider>
                    {menuItem.title}
                  </li>
                );
              })}
            </ul>
            <IconContext.Provider value={{ color: "var(--button-close-color)"}}>
            <FaTimesCircle className="c-menu__button" /> 
            </IconContext.Provider>
          </div>
        )
    }
}

export default Menu;




