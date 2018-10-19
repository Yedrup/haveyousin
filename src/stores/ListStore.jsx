 import {autorun, observable} from "mobx"
import { boolean } from "mobx-state-tree/dist/internal";

 class ListStore {
     @observable itemsInThisList = []
     id = String 
     dateOfCreation = Date
     @observable dateLastModified= Date
     @observable name = String
     canBeErased =  Boolean 
     isStyleEditable =  Boolean 
     @computed numberOfItems = Number
     @observable isPrivate = Boolean
     //default grey
     @observable colorAssociated = String
 } 

 const store = window.store = new ListStore;

 export default store; 

 autorun(() => {
    console.log(store.lists)

 })

 // in that way => ItemModel (id, hysid, item Current)