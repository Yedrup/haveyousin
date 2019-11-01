import { autorun, observable, action, trace } from "mobx";
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
  @observable lists = [];
  // @observable allIds = [];
  @observable customListIds = [];
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
    // console.log("isThisItemInThisList", isThisItemInThisList);
    if (isThisItemInThisList) {
      console.log("need to be removed from list");
      const index = this.lists[listId].itemsInThisList.indexOf(itemId);
      //TODO: manage change of color of icons list
      this.lists[listId].itemsInThisList.splice(index, 1);
    } else {
      this.lists[listId].itemsInThisList.push(itemId);
    }
    if(initStoreListFinished) {
      // console.log("LISTSSTORE addItemInThisList --- updateDataListsStore")
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
    // console.log("LISTSSTORE - firstRun property doesn't exist");
    setInLocalStorage("firstStoreListsrun", true);
    firstStoreListsrun = true;
    isExistingProperty = true;
  }
  // console.log("LISTSSTORE - firstStoreListsrun init function ", firstStoreListsrun);
  if (isExistingProperty && firstStoreListsrun) {
    // console.log("it's first run ", firstStoreListsrun);
    listsStore.lists = fakeState.lists.byId;
    // listsStore.allIds = fakeState.lists.allIds;
    listsStore.customListIds = fakeState.lists.customListIds;
    listsStore.defaultListIds = fakeState.lists.defaultListIds;
     setInLocalStorage("hysLists", listsStore.lists);
    //  setInLocalStorage("listAllIds", listsStore.allIds);
     setInLocalStorage("customListIds", listsStore.customListIds);
     setInLocalStorage("defaultListIds", listsStore.defaultListIds);
     setInLocalStorage("firstStoreListsrun", false);
  } else {
    // console.log("LISTSSTORE - need to get data from localstorage, because is firstrun = ", firstStoreListsrun);
    listsStore.lists =  getFromLocalStorage("hysLists");
    // listsStore.allIds =  getFromLocalStorage("listAllIds");
    listsStore.customListIds =  getFromLocalStorage("customListIds");
    listsStore.defaultListIds =  getFromLocalStorage("defaultListIds");
    setInLocalStorage("firstStoreListsrun", false);
    // console.log("LISTSSTORE - already data returns liststore :", listsStore.lists);
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
