import localStorage from 'mobx-localstorage';


export const setInLocalStorage =  (nameKey, object) => {
   localStorage.setItem(nameKey, object);
  return;
};
export const getFromLocalStorage =  nameKey => {
  let value =  localStorage.getItem(nameKey);
  return value;
};
export const isExistingInLocalStorage =  nameKey => {
  let isExistingInLS = localStorage.getItem(nameKey) !== null || undefined;
  return isExistingInLS;
};