export const setInLocalStorage = async (nameKey, object) => {
  await localStorage.setItem(nameKey, JSON.stringify(object));
  return;
};
export const getFromLocalStorage = async nameKey => {
  let value = await JSON.parse(localStorage.getItem(nameKey));
  return value;
};
export const isExistingInLocalStorage =  nameKey => {
  let isExistingInLS = localStorage.hasOwnProperty(nameKey);
  return isExistingInLS;
};

// export const getAllListsFromLocalStorage = async (patternNameKey) => {
//     console.log("localStorage", localStorage)

//     let filteredObj = {};
//     Object.keys(localStorage)
//         .filter( (key) => {
//             console.log(key.indexOf(patternNameKey) >= 0)
//             return key.indexOf(patternNameKey) >= 0;
//         })
//         .map((key) => {
//             return filteredObj[key] = localStorage.getItem(key);
//         });
//     console.log(JSON.stringify(filteredObj))
//     return JSON.stringify(filteredObj);

//     // .filter(function (key) {
//     //     console.log(key)
//     //     return key.indexOf(term) >= 0;
//     // })
//     // Object.keys(localStorage)
//     // .includes(patternNameKey)
//     // .map(item=>console.log(item))
//     // localStorage.map(item=>console.log(item))
//     // let value = await JSON.parse(localStorage.getItem(patternNameKey));
//     // return value;
// }

// function getUserById(id) {
//     return JSON.parse(localStorage.getItem('users')).filter(users => users.id === id)
// }

// getUserById(0)

// function test () {
//       Object.keys(localStorage)
//       .filter(function (key) {
//       console.log(key)
//           return key.indexOf(term) >= 0;
//       })
//       .map(function (key) {
//           filteredObj[key] = localStorage.getItem(key);
//       });
// }

// test()
