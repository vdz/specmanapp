export function arrayToHash(arr, level2 = null, prop = 'id', ) {
    let hash = {};
    arr.forEach( (item) => {
        hash[item[prop]] = item;
        if (level2) {
            hash[item[prop]][level2] = arrayToHash(item[level2]);
        }
    });
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
            if (list[a][param] === null && list[b][param] === null) {
                r = 0;
            } else if (list[a][param] === null) {
                r = 1;
            } else if (list[b][param] === null) {
                r = -1;
            } else {
                r = list[a][param] - list[b][param];
            }
        }

        return (dir == 'asc') ? r : (r * -1);
    });

    return result;
}

export function thumbnail(url) {
    const pdf_loc = url.lastIndexOf('.pdf');
    return (pdf_loc == -1) ? url : url.substr(0, pdf_loc) + '.jpg';
}

export function page(url, page) {
    const pos = url.indexOf('/upload/');
    let result = url;
    if (pos != -1) {
        result = url.substr(0, pos) + '/upload/pg_'+page+'/'+url.substr(pos+8);
    }
    return result;
}