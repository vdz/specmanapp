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

export function sortItemsByParam(list, param = 'name', dir = 'asc') {
    let result = Object.keys(list);
    result.sort((a,b) => {
        let r;
        if (typeof list[a][param] == 'string') {
            let A,B;
            A = list[a][param].toLowerCase();
            B = list[b][param].toLowerCase();

            if (A > B) {
                r = 1;
            } else if (A < B) {
                r = -1;
            } else {
                r = 0;
            }
        } else {
            r = list[a][param] - list[b][param];
        }

        return (dir == 'asc') ? r : (r * -1);
    });

    return result;
}