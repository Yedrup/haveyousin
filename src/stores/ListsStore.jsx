import { autorun, observable, action } from "mobx";
import fakeState from "../listsfakedata.mobx.js";
import {
  setInLocalStorage,
  getFromLocalStorage,
  isExistingInLocalStorage
} from "../services/localStorageService";
import {updateDataListsStore} from "../services/storeService";
let firstStoreListsrun;
let initStoreListFinished;

class ListsStore {
  @observable lists = {};
  @observable defaultListIds = [];
  @observable numberOfLists = Number;
  @action.bound
  addNewList = newList => {
    this.allIds.push(newList);
  };
  @action.bound
  addItemInThisList = (listId, itemId) => {
    let isThisItemInThisList = this.lists[listId].itemsInThisList.some(
      item => itemId === item
    );
    if (isThisItemInThisList) {
      console.log("need to be removed from list");
      const index = this.lists[listId].itemsInThisList.indexOf(itemId);
      this.lists[listId].itemsInThisList.splice(index, 1);
    } else {
      this.lists[listId].itemsInThisList.push(itemId);
    }
    if(initStoreListFinished) {
      updateDataListsStore(listsStore)
    }
  };

}

const listsStore = (window.listsStore = new ListsStore());

const init = () => {
  let isExistingProperty =  isExistingInLocalStorage("firstStoreListsrun");
  if (isExistingProperty) {
    firstStoreListsrun =  getFromLocalStorage("firstStoreListsrun");
  } else {
    setInLocalStorage("firstStoreListsrun", true);
    firstStoreListsrun = true;
    isExistingProperty = true;
  }
  if (isExistingProperty && firstStoreListsrun) {
    listsStore.lists = fakeState.lists.byId;
    listsStore.defaultListIds = fakeState.lists.defaultListIds;
     setInLocalStorage("hysLists", fakeState.lists.byId);
     setInLocalStorage("defaultListIds", fakeState.lists.defaultListIds);
     setInLocalStorage("firstStoreListsrun", false);
  } else {
    listsStore.lists =  getFromLocalStorage("hysLists");
    listsStore.defaultListIds =  getFromLocalStorage("defaultListIds");
    setInLocalStorage("firstStoreListsrun", false);
  }
  initStoreListFinished = true;
}
init();

export default listsStore;

autorun(() => {
  console.log("LISTSSTORE - autorun")
  // console.log("LISTSSTORE - is initStoreListFinished autorun listsSTORE", initStoreListFinished)
  if(initStoreListFinished) {
    // console.log("LISTSSTORE -  passing by update function")
    updateDataListsStore(listsStore)
  }
  console.log("LISTSSTORE - autorun listStore", listsStore);

});
