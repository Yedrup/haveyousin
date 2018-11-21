import { autorun, observable, action, computed } from "mobx";
import fakeState from "../listsfakedata.mobx.js";
import {
  setInLocalStorage,
  getFromLocalStorage,
  isExistingInLocalStorage
} from "../services/localStorageService";
import {updateDataItemStore} from "../services/storeService";

class ItemsStore {
  @observable allIds = [];
  @observable allItems = {};
  @action.bound
  addItemInItemsList(listId, item) {
    console.log("new item added", item, "in list ", listId);
    //TODO => add new item, need to create a class
    //TODO create hysID
    this.allIds.push(item.hysId);
    let iteem = { [item.hysId]: item };
    this.allItems = { ...this.allItems, ...iteem };
  }
}

const store = (window.store = new ItemsStore());
let firstStoreItemsrun;
let initStoreItemsFinished;

const init = () => {
  let isExistingProperty = isExistingInLocalStorage("firstStoreItemsrun");
  if (isExistingProperty) {
    firstStoreItemsrun = getFromLocalStorage("firstStoreItemsrun");
  } else {
    setInLocalStorage("firstStoreItemsrun", true);
    isExistingProperty = true;
    firstStoreItemsrun = true;
  }
  console.log("firstStoreItemsrun init function", firstStoreItemsrun);
  if (isExistingProperty && firstStoreItemsrun) {
    console.log("ITEMSTORE - it's first run ", firstStoreItemsrun);
    store.allItems = fakeState.allItemsInLists.byId;
    store.allIds = fakeState.allItemsInLists.allIds;
    setInLocalStorage("itemsIds", fakeState.allItemsInLists.allIds);
    setInLocalStorage("hysItems", fakeState.allItemsInLists.byId);
    setInLocalStorage("firstStoreItemsrun", false);
  } else {
    console.log("ITEMSTORE - need to get data from localstorage, because is firstrun = ", firstStoreItemsrun);
    store.allItems = getFromLocalStorage("hysItems");
    store.allIds = getFromLocalStorage("itemsIds");
    setInLocalStorage("firstStoreItemsrun", false);
    console.log("ITEMSTORE - already data returns :", store.allItems, store.allIds);
  }
  initStoreItemsFinished = true;
};

init();

export default store;
autorun( () => {
  console.log("ITEMSTORE - autorun")
  console.log("ITEMSTORE - is initStoreItemsFinished autorun", initStoreItemsFinished)
  if(initStoreItemsFinished) {
    console.log("ITEMSTORE -  passing by update function")
    updateDataItemStore(store)
  }
  console.log("autorun itemsStore", store);
  console.log("listsStore.allItems autorrun", store.allItems);
});

