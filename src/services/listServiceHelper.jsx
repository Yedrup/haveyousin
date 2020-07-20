export const getOneList = (listArray, idToFound) => {
  let content = { ...listArray[idToFound] };
  return content;
};

export const getThisListItems = (itemsInThisList, AllItems) => {
  if (itemsInThisList !== undefined) {
    const filtered = Object.keys(AllItems)
      .filter((key) => itemsInThisList.includes(key))
      .reduce((obj, key) => {
        obj[key] = AllItems[key];
        return obj;
      }, {});
    return filtered;
  }
};

export const changeKeyObject = (objectOrigin, keyOrigin, keyNew) => {
  let objectNew = { ...objectOrigin };
  Object.keys(objectNew).map((item) => {
    if (keyOrigin === item) {
      let mem = item[keyOrigin];
      delete item[keyOrigin];
      item[keyNew] = mem;
    }
    return item;
  });
  return objectNew;
};

export const getCustomLists = (defaultListIds, allLists) => {
  function isCustom(key) {
    return !defaultListIds.includes(key);
  }
  const filtered = Object.keys(allLists)
    .filter(isCustom)
    .reduce((obj, key) => {
      obj[key] = allLists[key];
      return obj;
    }, {});
  return filtered;
};

export const createHysIdForItems = (itemTmdbId, itemType) => {
  let suffixToConstructId;
  if (itemType === 'tv') {
    suffixToConstructId = 's';
  } else if (itemType === 'movie') {
    suffixToConstructId = 'm';
  } else {
    suffixToConstructId = 'p';
  }
  return `${itemTmdbId}${suffixToConstructId}`;
};

export const defineContentType = ({ first_air_date, release_date }) => {
  // console.log("objectContent", objectContent);
  let contentType;
  if (first_air_date) {
    contentType = 'tv';
  } else if (release_date) {
    contentType = 'movie';
  } else {
    contentType = 'person';
  }

  return contentType;
};
