export function arrayToHash(arr, prop = 'id') {
    let hash = {};
    arr.forEach( (item) => { hash[item[prop]] = item });
    return hash;
}