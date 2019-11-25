import React from "react";
import { IconContext } from "react-icons";
import {
  FaTimesCircle,
  FaCalendar,
  FaHome,
  FaSearch,
  FaHeart,
  FaBookmark,
  FaFilm,
  FaTv,
  FaList,
  FaBars,
  FaUserCircle,
  FaUser,
  FaQuestionCircle,
  FaCheck,
  FaArrowAltCircleDown
} from "react-icons/fa";

class IconService extends React.Component {
  render() {
    const Icons = [
      { title: "close", nameIcon: FaTimesCircle },
      { title: "home", nameIcon: FaHome },
      { title: "menu", nameIcon: FaBars },
      { title: "search", nameIcon: FaSearch },
      { title: "calendar", nameIcon: FaCalendar },
      { title: "toWatchList", nameIcon: FaBookmark },
      { title: "tv", nameIcon: FaTv },
      { title: "movie", nameIcon: FaFilm },
      { title: "favorites", nameIcon: FaHeart },
      { title: "archives", nameIcon: FaCheck },
      { title: "customLists", nameIcon: FaList },
      { title: "user", nameIcon: FaUserCircle },
      { title: "people", nameIcon: FaUser },
      { title: "about", nameIcon: FaQuestionCircle },
      { title: "loadMore", nameIcon: FaArrowAltCircleDown }
    ];
    let iconToFind = this.props.nameIcon;
    let iconStyleContext = this.props.iconStyleContext;
    function getIconComponent(icon) {
      return icon.title === iconToFind;
    }
    let IconName = Icons.find(getIconComponent);
    if(IconName) IconName = IconName.nameIcon;
    else return null

    return (
      <span>
      <IconContext.Provider value={iconStyleContext}>
        <IconName />
      </IconContext.Provider>
      </span>
    );
  }
}

export default IconService;
