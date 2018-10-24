 import {autorun, observable, action} from "mobx"
// import  from "/src/listsfakedata.mobx"
import fakeState from "../listsfakedata.mobx.js";

 class ListsStore {
     @observable lists = []
     @observable allIds = []
     @observable customListIds = []
     @observable defaultListIds = []
     @observable numberOfLists = Number
     @action addNewList = (newList) => {
         console.log("new list added",newList )
         this.allIds.push(newList)
     }
 } 

 const listsStore = window.listsStore = new ListsStore();


export default listsStore; 

 autorun(() => {
    console.log(listsStore)

 })

// this.todos.push(new TodoModel(title));
// in that way => newListModel (id, item Current)