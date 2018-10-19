 import {autorun, observable, action} from "mobx"

 class ListsStore {
     @observable lists = []
     @observable allIds = []
     @observable customListIds = []
     @observable defaultListIds = []
     @observable numberOfLists = Number
     @action addNewList = (newList) => {
         console.log("new list added",newList )
         this.lists.push(newList)
     }
 } 

 const store = window.store = new ListsStore;

 export default store; 

 autorun(() => {
    console.log(store.lists)

 })

// this.todos.push(new TodoModel(title));
// in that way => newListModel (id, item Current)