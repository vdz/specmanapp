export function arrayToHash(arr) {
    let hash = {};
    arr.forEach( (item) => { hash[item.id] = item });
    return hash;
}