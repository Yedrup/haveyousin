import {autorun, observable, action} from "mobx"

class ItemsStore {
    @observable allIds = []
    hysId = String 
    @computed numberOfItems = Number
    @action addItemInList = (listId, item) => {
        console.log("new item added",item )
        this.itemsInThisList.push(item)
    }
} 

const store = window.store = new ItemsStore();

export default store; 

autorun(() => {
   console.log(store.lists)

})