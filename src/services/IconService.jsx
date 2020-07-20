import React, { Component } from 'react';
import { IconContext } from 'react-icons';
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
  FaArrowAltCircleDown,
} from 'react-icons/fa';

class IconService extends Component {
  render() {
    const { nameIcon, iconStyleContext } = this.props;

    const Icons = [
      { title: 'close', nameIcon: FaTimesCircle },
      { title: 'home', nameIcon: FaHome },
      { title: 'menu', nameIcon: FaBars },
      { title: 'search', nameIcon: FaSearch },
      { title: 'calendar', nameIcon: FaCalendar },
      { title: 'toWatchList', nameIcon: FaBookmark },
      { title: 'tv', nameIcon: FaTv },
      { title: 'movie', nameIcon: FaFilm },
      { title: 'favorites', nameIcon: FaHeart },
      { title: 'archives', nameIcon: FaCheck },
      { title: 'customLists', nameIcon: FaList },
      { title: 'user', nameIcon: FaUserCircle },
      { title: 'people', nameIcon: FaUser },
      { title: 'about', nameIcon: FaQuestionCircle },
      { title: 'loadMore', nameIcon: FaArrowAltCircleDown },
    ];

    function getIconComponent(icon) {
      return icon.title === nameIcon;
    }
    let IconName = Icons.find(getIconComponent);
    if (IconName) IconName = IconName.nameIcon;
    else return null;

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
