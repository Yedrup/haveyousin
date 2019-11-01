export const getOneList = (listArray, idToFound) => {
  let content = { ...listArray[idToFound] };
  // console.log("content from getOneList", content);
  return content;
};

export const getThisListItems = (itemsInThisList, AllItems) => {
  // console.log(" itemsInThisList", itemsInThisList);
  // console.log(" AllItems", AllItems);
  if (itemsInThisList !== undefined) {
    const filtered = Object.keys(AllItems)
      .filter(key => itemsInThisList.includes(key))
      .reduce((obj, key) => {
        obj[key] = AllItems[key];
        return obj;
      }, {});
    // console.log(filtered);
    return filtered;
  }
};


export const changeKeyObject =  (objectOrigin, keyOrigin, keyNew) => {
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
}

export const getCustomLists = (customListIds, allLists) => {
  console.log(" customListIds", customListIds);
  console.log(" allLists", allLists);

  const filtered = Object.keys(allLists)
    .filter(key => customListIds.includes(key))
    .reduce((obj, key) => {
      obj[key] = allLists[key];
      return obj;
    }, {});
  // console.log(filtered);
  return filtered;
};

export const createHysIdForItems = (itemTmdbId, itemType) => {
  // console.log("itemTmdbId", itemTmdbId);
  // console.log(" itemType", itemType);

  let suffixToConstructId;
  if (itemType === "tv") {
    suffixToConstructId = "s";
  } else if (itemType === "movie") {
    suffixToConstructId = "m";
  } else {
    suffixToConstructId = "p";
  }
  return `${itemTmdbId}${suffixToConstructId}`;
};

export const defineContentType = objectContent => {
  // console.log("objectContent", objectContent);
  let contentType;
  if (objectContent.first_air_date) {
    contentType = "tv";
  } else if (objectContent.release_date) {
    contentType = "movie";
  } else {
    contentType = "person";
  }

  return contentType;
};

//function check if content present in one list
