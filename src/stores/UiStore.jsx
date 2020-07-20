import { autorun, observable } from 'mobx';

class UiStore {
  //background color for tiles custom. id list + color
  @observable customizationColor = [];

  //position in array will define the place in the list
  @observable customizationPosition = [];

  //colors avaiblable to choose for the tiles
  @observable colorsAvailableInApp = [];
}

const store = (window.store = new UiStore());

export default store;

autorun(() => {
  console.log(store);
});
