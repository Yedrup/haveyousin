//TODO: create only one list and add references

import ImageArchives from '../img/archives.jpeg';
import ImageCalendar from '../img/calendar.jpeg';
import ImageFavorites from '../img/popcorn.jpeg';
import ImageToWatchList from '../img/toWatchList.jpeg';

const DEFAULT_NAV_ITEMS = {
  CALENDAR: {
    title: 'calendar',
    displayName: 'Calendar',
    link: '/calendar',
    image: ImageCalendar,
  },
  TOWATCHLIST: {
    title: 'toWatchList',
    displayName: 'To Watch List',
    link: '/list/1',
    image: ImageToWatchList,
  },
  ARCHIVES: {
    title: 'archives',
    displayName: 'Archives',
    link: '/list/2',
    image: ImageArchives,
  },
  FAVORITES: {
    title: 'favorites',
    displayName: 'Favorites',
    link: '/list/3',
    image: ImageFavorites,
  },
};

const HOME_ITEMS = {
  ...DEFAULT_NAV_ITEMS,
};

const MENU_ITEMS = {
  HOME: {
    title: 'home',
    displayName: 'Home',
    link: '/',
  },
  ...DEFAULT_NAV_ITEMS,
  // CUSTOMLISTS: {
  //     title: "customLists",
  //     link: "/listHome",
  // },
  // SETTINGS: {
  //     title: "user",
  //     link: "/settings"
  // },
  ABOUT: {
    title: 'about',
    displayName: 'About',
    link: '/about',
  },
};

const FOOTER_ITEMS = {
  ...DEFAULT_NAV_ITEMS,
};

export { MENU_ITEMS, FOOTER_ITEMS, HOME_ITEMS };
