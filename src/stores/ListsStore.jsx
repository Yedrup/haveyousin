 import {autorun, observable, action} from "mobx"
// import  from "/src/listsfakedata.mobx"
import fakeState from "../listsfakedata.mobx.js";
import {
    setInLocalStorage,
    getFromLocalStorage
  } from "../services/localStorageService";

 class ListsStore {
     @observable lists = []
     @observable allIds = []
     @observable customListIds = []
     @observable defaultListIds = []
     @observable numberOfLists = Number
     @action.bound
     addNewList = (newList) => {
         this.allIds.push(newList)
     }
     @action.bound
     addItemInThisList = (listId, itemId) => {
         let isThisItemInThisList = this.lists[listId].itemsInThisList.some(item =>(itemId === item ));
         console.log("isThisItemInThisList",isThisItemInThisList);
         if(isThisItemInThisList) {
             console.log("need to be removed from list")
             const index = this.lists[listId].itemsInThisList.indexOf(itemId)
             //TODO: manage change of color of icons list
             return this.lists[listId].itemsInThisList.splice(index,1);
         } else {
            return this.lists[listId].itemsInThisList.push(itemId);
         }
     }


    
 } 

 const listsStore = window.listsStore = new ListsStore();


export default listsStore; 

 autorun(() => {
    console.log("autorun listsStore ",listsStore)
    let lists = listsStore.lists;
    Object.keys(lists).map(list => {
        console.log("list autorun",lists[list])
        setInLocalStorage(lists[list].id,lists[list])
    })
 })

// this.todos.push(new TodoModel(title));
// in that way => newListModel (id, item Current)