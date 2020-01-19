import { autorun, observable, action } from "mobx";
import fakeState from "../listsfakedata.mobx.js";
import { changeKeyObject } from "../services/listServiceHelper";
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
    this.itemStatusByList = {
      "1": null,
      "2": null,
      "3": null,
      "4": null
    };
  }
}

class ItemsStore {

  @observable allItems = {};

  @action.bound
  addItemInItemsList(listId, item) {
    // console.log("addItemInItemsList", item, "in list ", listId);
    let hysId = item.hysId;

    // is item exists in HYS items 
    let isExistingItemAsHysItem = this.allItems.hasOwnProperty(hysId);

    if (isExistingItemAsHysItem) {
      let itemToUpdate = this.allItems[hysId];
      if (itemToUpdate.lists) {
        if (itemToUpdate.lists.length > 0 && itemToUpdate.lists.includes(listId)) {
          //Removal listsId && itemStatusByList because listId exists in array
          const index = itemToUpdate.lists.indexOf(listId);
          itemToUpdate.lists.splice(index, 1);
          itemToUpdate.itemStatusByList[listId] = null;
          // console.log("itemToUpdate ====> null", itemToUpdate);
        } else {
          //Add listId && itemStatusByList because it doesn't exist in array
          itemToUpdate.lists.push(listId);
          itemToUpdate.itemStatusByList[listId] = true;
          // console.log("itemToUpdate ====> true", itemToUpdate);
        }
      } else {
        // create listsId  && itemStatusByList 
        itemToUpdate.lists = [];
        itemToUpdate.itemStatusByList = {};
        itemToUpdate.lists.push(listId);
        itemToUpdate.itemStatusByList[listId] = true;
      }

      if (itemToUpdate.lists.length === 0) {
        //check if there is still a listId associated to this item
        let updateItemsWithRemovalOfCurrentItem = { ...this.allItems };
        let isObjectRemoved = delete updateItemsWithRemovalOfCurrentItem[hysId];
        this.allItems = updateItemsWithRemovalOfCurrentItem;
      } else {
        //Item is still in at least one list => modify obversable
        this.allItems = changeKeyObject(this.allItems, hysId, itemToUpdate);
      }
    } else {
      // Add new item in itemsList, create its listsId  && its itemStatusByList 
      item.lists = [];
      item.itemStatusByList = {};
      item.lists.push(listId);
      item.itemStatusByList[listId] = true;
      let newItem = { [hysId]: item };
      return this.allItems = { ...this.allItems, ...newItem };
    }

    if (initStoreItemsFinished) {
      //Save all current modifications 
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
    store.itemsPannelAction = fakeState.allItemsInLists.itemsPannelAction;
    setInLocalStorage("hysItems", fakeState.allItemsInLists.byId);
    setInLocalStorage("firstStoreItemsrun", false);
  } else {
    setInLocalStorage("firstStoreItemsrun", false);
    store.allItems = getFromLocalStorage("hysItems");
  }
  initStoreItemsFinished = true;
};

init();

export default store;
autorun(() => {
  // console.log("ITEMSTORE - autorun");
  // console.log("ITEMSTORE - is initStoreItemsFinished autorun", initStoreItemsFinished)
  if (initStoreItemsFinished) {
    // console.log("ITEMSTORE -  passing by update function")
    updateDataItemStore(store);
  }
  // console.log("autorun itemsStore", store);
  // console.log("listsStore.allItems autorrun", store);
});
