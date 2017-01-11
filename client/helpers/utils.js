export function arrayToHash(arr, prop = 'id') {
    let hash = {};
    arr.forEach( (item) => { hash[item[prop]] = item });
    return hash;
}

export function addClass(elm, className) {
    if (!elm || !className) return;
    if (elm.classList.contains(className)) return;
    elm.classList.add(className);
}

export function removeClass(elm, className) {
    if (!elm || !className) return;
    if (!elm.classList.contains(className)) return;
    elm.classList.remove(className);
}