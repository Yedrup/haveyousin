export const setInLocalStorage = (nameKey, object) => {
    return localStorage.setItem(nameKey, JSON.stringify(object));
}
export const getFromLocalStorage = async (nameKey) => {
    let value = await JSON.parse(localStorage.getItem(nameKey));
    return value;
}
