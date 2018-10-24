import {autorun, observable, action, computed} from "mobx"

class ItemsStore {
    @observable allIds = []
    @observable allItems = []
    // @computed get numberOfItems = func
    @action addItemInList = (listId, item) => {
        console.log("new item added",item )
        //TODO => add new item, need to create a class
        //TODO create hysID
        this.itemsInThisList.push(item)
    }
} 

const store = window.store = new ItemsStore();

export default store; 

autorun(() => {
   console.log(store.lists)

})