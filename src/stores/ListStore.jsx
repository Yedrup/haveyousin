 import {autorun, observable, computed, action} from "mobx"

 class ListStore {
     id = String 
     @observable name = String
     @observable itemsInThisList = []
     @observable isPrivate = Boolean
     @observable dateLastModified= Date
     @observable colorAssociated = String
     @computed numberOfItems = Number
     canBeErased =  Boolean 
     isStyleEditable =  Boolean 
     dateOfCreation = Date
     //default grey
 } 

 const singleList = window.singleList = new ListStore();

 export default singleList; 

 autorun(() => {
    console.log(singleList.itemsInThisList)

 })

 // in that way => ItemModel (id, hysid, item Current) 