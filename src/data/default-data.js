const defaultData = {
  user: {},
  lists: {
    byId: {
      '1': {
        id: 1,
        nameList: 'To Watch List',
        nameIcon: 'toWatchList',
        isPrivate: true,
        isDefaultList: true,
        canBeErased: false,
        dateLastUpdate: null,
        isStyleEditable: false,
        itemsInThisList: [],
      },
      '2': {
        id: 2,
        nameList: 'Archives',
        nameIcon: 'archives',
        isPrivate: true,
        isDefaultList: true,
        dateLastUpdate: null,
        isStyleEditable: false,
        canBeErased: false,
        itemsInThisList: [],
      },
      '3': {
        id: 3,
        nameList: 'Favorites',
        nameIcon: 'favorites',
        isPrivate: true,
        isDefaultList: true,
        canHavePersonCard: true,
        canBeErased: false,
        dateLastUpdate: null,
        isStyleEditable: false,
        itemsInThisList: [],
      },
    },
    defaultListIds: ['1', '2', '3'],
  },
  allItemsInLists: {
    byId: {},
  },
};
export default defaultData;
