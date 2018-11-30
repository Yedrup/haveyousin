import { decorate, autorun, observable, action, computed } from "mobx";
import fakeState from "../listsfakedata.mobx.js";
import {
  setInLocalStorage,
  getFromLocalStorage,
  isExistingInLocalStorage
} from "../services/localStorageService";
import { updateDataItemStore } from "../services/storeService";

class ItemActionPannelStatus {
  constructor(itemId) {
    this.hysId = itemId;
    this.pannelActionByList = {
      "1": null,
      "2": null,
      "3": null,
      "4": null
    };
  }
}

class ItemsStore {
  @observable allIds = [];

  @observable allItems = {};

  @observable itemsPannelAction = [];

  //TODO: get computed for navigation
  @action.bound
  setItemPannelActionByList(listId, itemId) {
    const getItemAction = item => {
      return item.hysId === itemId;
    };
    if (this.itemsPannelAction.length > 0) {
      // if (this.itemsPannelAction[itemId][listId] !== null) {
      console.log(
        "lenght of this.itemsPannelAction: ",
        this.itemsPannelAction.length
      );
      let isThisItemExisting = this.itemsPannelAction.some(
        item => itemId === item.hysId
      );
      console.log(isThisItemExisting);
      if (isThisItemExisting) {
        let itemToModify = this.itemsPannelAction.find(getItemAction);
        console.log("it already exists", isThisItemExisting, itemToModify);

        let currentItemPannelActionByList =
          itemToModify.pannelActionByList[listId];

        if (currentItemPannelActionByList === null) {
          itemToModify.pannelActionByList[listId] = true;
        } else if (currentItemPannelActionByList) {
          itemToModify.pannelActionByList[listId] = false;
        } else {
          itemToModify.pannelActionByList[listId] = true;
        }
        let safeSave = [...this.itemsPannelAction];

        let thisItemIndex = safeSave.findIndex(item => item.hysId === itemId);
        safeSave.splice(thisItemIndex, 1);
        safeSave.push(itemToModify);

        this.itemsPannelAction = safeSave;
      } else {
        let newItemPannelAction = new ItemActionPannelStatus(itemId);
        let safeSave;
        newItemPannelAction.pannelActionByList[listId] = true;
        safeSave = [...this.itemsPannelAction, newItemPannelAction];
        this.itemsPannelAction = safeSave;
        console.log(newItemPannelAction);
      }

      console.log(
        "------> this.itemsPannelAction",
        this.itemsPannelAction
      );
    } else {
      console.log(
        "this.itemsPannelAction.length est égal à 0",
        this.itemsPannelAction.length
      );
      let newItemPannelAction = new ItemActionPannelStatus(itemId);
      newItemPannelAction.pannelActionByList[listId] = true;
      let safeSave;
      safeSave = [...this.itemsPannelAction, newItemPannelAction];
      this.itemsPannelAction = safeSave;
      console.log(
        "------> this.itemsPannelAction",
        this.itemsPannelAction
      );
    }
  }

  @action.bound
  addItemInItemsList(listId, item) {
    console.log("new item added", item, "in list ", listId);
    if (!this.allIds[item.hysId]) this.allIds.push(item.hysId);
    let hysId = item.hysId;
    let newItem = { [hysId]: item };
    console.log("newItem", newItem);
    this.allItems = { ...this.allItems, ...newItem };
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
    firstStoreItemsrun = true;
    isExistingProperty = true;
  }
  // console.log("firstStoreItemsrun init function", firstStoreItemsrun);
  if (isExistingProperty && firstStoreItemsrun) {
    // console.log("ITEMSTORE - it's first run ", firstStoreItemsrun);
    // console.log("fakeState",fakeState.allItemsInLists.byId,  fakeState.allItemsInLists.byId)
    store.allItems = fakeState.allItemsInLists.byId;
    store.allIds = fakeState.allItemsInLists.allIds;
    store.itemsPannelAction = fakeState.allItemsInLists.itemsPannelAction;
    setInLocalStorage("itemsIds", fakeState.allItemsInLists.allIds);
    setInLocalStorage("hysItems", fakeState.allItemsInLists.byId);
    setInLocalStorage(
      "itemsPannelAction",
      fakeState.allItemsInLists.itemsPannelAction
    );
    setInLocalStorage("firstStoreItemsrun", false);
  } else {
    // console.log("ITEMSTORE - need to get data from localstorage, because is firstrun = ", firstStoreItemsrun);
    setInLocalStorage("firstStoreItemsrun", false);
    store.allItems = getFromLocalStorage("hysItems");
    store.allIds = getFromLocalStorage("itemsIds");
    store.itemsPannelAction = getFromLocalStorage("itemsPannelAction");
    // console.log("ITEMSTORE - already data returns :", store.allItems, store.allIds);
  }
  initStoreItemsFinished = true;
};

init();

export default store;
autorun(() => {
  console.log("ITEMSTORE - autorun");
  // console.log("ITEMSTORE - is initStoreItemsFinished autorun", initStoreItemsFinished)
  if (initStoreItemsFinished) {
    // console.log("ITEMSTORE -  passing by update function")
    updateDataItemStore(store);
  }
  console.log("autorun itemsStore", store);
  // console.log("listsStore.allItems autorrun", store);
});
