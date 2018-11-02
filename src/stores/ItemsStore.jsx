import {autorun, observable, action, computed} from "mobx"

class ItemsStore {
    @observable allIds = []
    @observable allItems = {}
    // @computed get numberOfItems = func
    @action.bound 
    addItemInItemsList(listId, item) {
        console.log("new item added",item, "in list ", listId )
        //TODO => add new item, need to create a class
        //TODO create hysID
        this.allIds.push(item.hysId);
        let iteem = {[item.hysId]:item};
        this.allItems = {...this.allItems, ...iteem}
    }
} 

const store = window.store = new ItemsStore();

export default store; 

autorun(() => {
   console.log("autorun itemsStore", store)
})