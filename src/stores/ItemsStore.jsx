import { decorate, autorun, observable, action, computed } from "mobx";
import fakeState from "../listsfakedata.mobx.js";
import { changeKeyObject, removeKeyObject } from "../services/listServiceHelper";
import {
  setInLocalStorage,
  getFromLocalStorage,
  isExistingInLocalStorage
} from "../services/localStorageService";
import { updateDataItemStore } from "../services/storeService";
let firstStoreItemsrun;
let initStoreItemsFinished;
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
  // @observable allIds = [];

  @observable allItems = {};

  @observable itemsPannelAction = [];

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
          itemToModify.pannelActionByList[listId] = null;
        } else {
          itemToModify.pannelActionByList[listId] = true;
        }
        //Remove item from observer if not remaining in any list
        let isThisItemRemainingInList = Object.values(itemToModify.pannelActionByList).some(
          item => true === item
        );
        let safeSave;
        if(!isThisItemRemainingInList) {
          safeSave = [...this.itemsPannelAction];
          let thisItemIndex = safeSave.findIndex(item => item.hysId === itemId);
          safeSave.splice(thisItemIndex, 1);
        } else {
          safeSave = [...this.itemsPannelAction];
          let thisItemIndex = safeSave.findIndex(item => item.hysId === itemId);
          safeSave.splice(thisItemIndex, 1);
          safeSave.push(itemToModify);
  
        }
        this.itemsPannelAction = safeSave;
      } else {
        let newItemPannelAction = new ItemActionPannelStatus(itemId);
        let safeSave;
        newItemPannelAction.pannelActionByList[listId] = true;
        safeSave = [...this.itemsPannelAction, newItemPannelAction];
        this.itemsPannelAction = safeSave;
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
    console.log("addItemInItemsList", item, "in list ", listId);
    
    let hysId = item.hysId;
       // allIds
    // let isExistingItemId = this.allIds.includes(hysId);
    // if (!isExistingItemId) {
    //   console.log("this item doesn't exist")
    //   this.allIds.push(hysId);
    // }


    // is HYS item exisists in allItems
    let isExistingItemAsHysItem = this.allItems.hasOwnProperty(hysId);
    if (isExistingItemAsHysItem) {
      let itemToUpdate = this.allItems[hysId];

      if (itemToUpdate.lists) {
        if (itemToUpdate.lists.length > 0 && itemToUpdate.lists.includes(listId)) {
          //Modify listsId of item. If listID exists it's a removal
          const index = itemToUpdate.lists.indexOf(listId);
          itemToUpdate.lists.splice(index, 1);
        } else {
          itemToUpdate.lists.push(listId);
        }
      } else {
        // there is no lists array yet
        itemToUpdate.lists = [];
        itemToUpdate.lists.push(listId);
      }

      if (itemToUpdate.lists.length === 0) {
        //check if there is still a listId associated to this item
        let updateItemsWithRemovalOfCurrentItem = { ...this.allItems };
        let isObjectRemoved = delete updateItemsWithRemovalOfCurrentItem[hysId];
        this.allItems = updateItemsWithRemovalOfCurrentItem;
      } else {
        //Modification of the items
        this.allItems = changeKeyObject(this.allItems, hysId, itemToUpdate);
      }
    } else {
      item.lists = [];
      item.lists.push(listId);
      let newItem = { [hysId]: item };
      return this.allItems = { ...this.allItems, ...newItem };
    }

    if (initStoreItemsFinished) {
      //Save all current modification 
      updateDataItemStore(store);
    }
  }

}


const store = (window.store = new ItemsStore());


const init = () => {
  let isExistingProperty = isExistingInLocalStorage("firstStoreItemsrun");
  if (isExistingProperty) {
    firstStoreItemsrun = getFromLocalStorage("firstStoreItemsrun");
  } else {
    setInLocalStorage("firstStoreItemsrun", true);
    firstStoreItemsrun = true;
    isExistingProperty = true;
  }
  if (isExistingProperty && firstStoreItemsrun) {
    store.allItems = fakeState.allItemsInLists.byId;
    // store.allIds = fakeState.allItemsInLists.allIds;
    store.itemsPannelAction = fakeState.allItemsInLists.itemsPannelAction;
    // setInLocalStorage("itemsIds", fakeState.allItemsInLists.allIds);
    setInLocalStorage("hysItems", fakeState.allItemsInLists.byId);
    setInLocalStorage(
      "itemsPannelAction",
      fakeState.allItemsInLists.itemsPannelAction
    );
    setInLocalStorage("firstStoreItemsrun", false);
  } else {
    setInLocalStorage("firstStoreItemsrun", false);
    store.allItems = getFromLocalStorage("hysItems");
    // store.allIds = getFromLocalStorage("itemsIds");
    store.itemsPannelAction = getFromLocalStorage("itemsPannelAction");
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
