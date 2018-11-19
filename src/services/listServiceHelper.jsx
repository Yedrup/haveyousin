export const getOneList = (listArray, idToFound) => {
  let content = { ...listArray[idToFound] };
  console.log("content from getOneList", content);
  return content;
};

export const getThisListItems = (itemsInThisList, AllItems) => {
  console.log(" itemsInThisList", itemsInThisList);
  console.log(" AllItems", AllItems);
  if (itemsInThisList !== undefined) {
    const filtered = Object.keys(AllItems)
      .filter(key => itemsInThisList.includes(key))
      .reduce((obj, key) => {
        obj[key] = AllItems[key];
        return obj;
      }, {});
    console.log(filtered);
    return filtered;
  }
};

export const getCustomLists = (customListIds, allLists) => {
  console.log(" customListIds", customListIds);
  console.log(" allLists", allLists);

  const filtered = Object.keys(allLists)
    .filter(key => customListIds.includes(key))
    .reduce((obj, key) => {
      obj[key] = allLists[key];
      return obj;
    }, {});
  console.log(filtered);
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

export const defineContentType = objecContent => {
  // console.log("objecContent", objecContent);
  let contentType;
  if (objecContent.first_air_date) {
    contentType = "tv";
  } else if (objecContent.release_date) {
    contentType = "movie";
  } else {
    contentType = "person";
  }

  return contentType;
};

//function check if content present in one list
