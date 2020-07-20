import {
  setInLocalStorage,
  getFromLocalStorage,
  isExistingInLocalStorage,
} from './localStorageService';

export const updateDataItemStore = ({ allItems }) => {
  let isExistingProperty = isExistingInLocalStorage('firstStoreItemsRun');
  let firstStoreItemsRun = getFromLocalStorage('firstStoreItemsRun');
  if (isExistingProperty && !firstStoreItemsRun) {
    setInLocalStorage('hysItems', allItems);
  } else {
    console.log(
      'falling in else of UpdateData item store called in autorun because : isExistingProperty ',
      isExistingProperty,
      'and : firstStoreItemsRun ',
      firstStoreItemsRun
    );
  }
};

export const updateDataListsStore = ({ lists, defaultListIds }) => {
  let isExistingProperty = isExistingInLocalStorage('firstStoreListsRun');
  let firstStoreListsRun = getFromLocalStorage('firstStoreListsRun');
  if (isExistingProperty && !firstStoreListsRun) {
    setInLocalStorage('hysLists', lists);
    setInLocalStorage('defaultListIds', defaultListIds);
  } else {
    console.log(
      'falling in else of UpdateData item store called in autorun because : isExistingProperty ',
      isExistingProperty,
      'and : firstStoreListsRun ',
      firstStoreListsRun
    );
  }
};
