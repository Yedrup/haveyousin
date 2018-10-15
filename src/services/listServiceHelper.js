export const getOneList = (listArray, idToFound) => {
    let content = { ...listArray[idToFound]
    };
    console.log("content from getOneList", content);
    return content;
};

export const getThisListItems = (itemsInThisList, AllItems) => {
    console.log(" itemsInThisList", itemsInThisList);
    console.log(" AllItems", AllItems);

    const filtered = Object.keys(AllItems)
      .filter(key => itemsInThisList.includes(key))
      .reduce((obj, key) => {
        obj[key] = AllItems[key];
        return obj;
      }, {});
    console.log(filtered);
    return filtered;
  };

  export const createHysIdForItems = (itemTmdbId, itemType) => {
    console.log("itemTmdbId", itemTmdbId);
    console.log(" itemType", itemType);

    let suffixToConstructId;
    if (itemType === "tv") {
      suffixToConstructId = "s";
    } else if (itemType === "movie") {
      suffixToConstructId = "m";
    } else {
      suffixToConstructId = "p";
    }
    return `${itemTmdbId}${suffixToConstructId}`;

}