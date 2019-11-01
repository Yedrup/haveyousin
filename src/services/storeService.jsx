import {
  setInLocalStorage,
  getFromLocalStorage,
  isExistingInLocalStorage
} from "./localStorageService";

export const updateDataItemStore = (store) => {
  let isExistingProperty = isExistingInLocalStorage("firstStoreItemsrun");
  let firstStoreItemsrun = getFromLocalStorage("firstStoreItemsrun");
  if (isExistingProperty && !firstStoreItemsrun) {
    setInLocalStorage("hysItems", store.allItems);
  } else {
    console.log("falling in else of UpdateData item store called in autorun because : isExistingProperty ", isExistingProperty, "and : firstStoreItemsrun ", firstStoreItemsrun);
  }
}

export const updateDataListsStore = (store) => {
  let isExistingProperty = isExistingInLocalStorage("firstStoreListsrun");
  let firstStoreListsrun = getFromLocalStorage("firstStoreListsrun");
  if (isExistingProperty && !firstStoreListsrun) {
    setInLocalStorage("hysLists", store.lists);
    setInLocalStorage("defaultListIds", store.defaultListIds);
  } else {
    console.log("falling in else of UpdateData item store called in autorun because : isExistingProperty ", isExistingProperty, "and : firstStoreListsrun ", firstStoreListsrun);

  }
}

