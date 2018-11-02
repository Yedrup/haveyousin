 import {autorun, observable, action} from "mobx"
// import  from "/src/listsfakedata.mobx"
import fakeState from "../listsfakedata.mobx.js";

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
         return this.lists[listId].itemsInThisList.push(itemId);
     }
 } 

 const listsStore = window.listsStore = new ListsStore();


export default listsStore; 

 autorun(() => {
    console.log("autorun listsStore ",listsStore)

 })

// this.todos.push(new TodoModel(title));
// in that way => newListModel (id, item Current)