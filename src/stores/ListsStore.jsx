import { autorun, observable, action } from 'mobx';
import defaultData from '../data/default-data.js';
import {
  setInLocalStorage,
  getFromLocalStorage,
  isExistingInLocalStorage,
} from '../services/localStorageService';
import { updateDataListsStore } from '../services/storeService';
let firstStoreListsRun;
let initStoreListFinished;

class ListsStore {
  @observable lists = {};
  @observable defaultListIds = [];
  @observable numberOfLists = Number;
  @action.bound
  addNewList = (newList) => {
    this.allIds.push(newList);
  };
  @action.bound
  addItemInThisList = (listId, itemId) => {
    let isThisItemInThisList = this.lists[listId].itemsInThisList.some(
      (item) => itemId === item
    );
    if (isThisItemInThisList) {
      // console.log("need to be removed from list");
      const index = this.lists[listId].itemsInThisList.indexOf(itemId);
      this.lists[listId].itemsInThisList.splice(index, 1);
    } else {
      this.lists[listId].itemsInThisList.push(itemId);
    }
    if (initStoreListFinished) {
      updateDataListsStore(listsStore);
    }
  };
}

const listsStore = (window.listsStore = new ListsStore());

const init = () => {
  let isExistingProperty = isExistingInLocalStorage('firstStoreListsRun');
  if (isExistingProperty) {
    firstStoreListsRun = getFromLocalStorage('firstStoreListsRun');
  } else {
    setInLocalStorage('firstStoreListsRun', true);
    firstStoreListsRun = true;
    isExistingProperty = true;
  }
  if (isExistingProperty && firstStoreListsRun) {
    listsStore.lists = defaultData.lists.byId;
    listsStore.defaultListIds = defaultData.lists.defaultListIds;
    setInLocalStorage('hysLists', defaultData.lists.byId);
    setInLocalStorage('defaultListIds', defaultData.lists.defaultListIds);
    setInLocalStorage('firstStoreListsRun', false);
  } else {
    listsStore.lists = getFromLocalStorage('hysLists');
    listsStore.defaultListIds = getFromLocalStorage('defaultListIds');
    setInLocalStorage('firstStoreListsRun', false);
  }
  initStoreListFinished = true;
};
init();

export default listsStore;

autorun(() => {
  if (initStoreListFinished) {
    updateDataListsStore(listsStore);
  }
});
