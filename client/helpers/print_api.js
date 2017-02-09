import { config } from '../config/config.js';

export function docraptor (opts) {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        const url = config.PRINT_API_URL;
        let params  = {...opts.params};

        xhr.open(opts.method, url);

        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };

        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText,
                response: xhr.response
            });
        };

        if (opts.headers) {
            Object.keys(opts.headers).forEach(function (key) {
                xhr.setRequestHeader(key, opts.headers[key]);
            });
        }
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Content-Type', 'application/json');

        if (params && typeof params === 'object') {
            params = JSON.stringify(params);
        }

        xhr.send(params);
    });
}

export function getRawPrintCSS() {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        const url = '/css/print.css';

        xhr.open('get', url);

        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };

        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText,
                response: xhr.response
            });
        };

        xhr.send();
    });
}