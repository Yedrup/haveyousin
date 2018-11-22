import localStorageMbx from 'mobx-localstorage';


export const setInLocalStorage =  (nameKey, object) => {
  localStorageMbx.setItem(nameKey, object);
  return;
};
export const getFromLocalStorage =  nameKey => {
  let value =  localStorageMbx.getItem(nameKey);
  return value;
};
export const isExistingInLocalStorage =   (nameKey) => {

  let isExistingInLS = localStorage.hasOwnProperty(nameKey);
  console.log(nameKey, "isExistingInLocalStorage: ", isExistingInLS )
  return isExistingInLS;
};
