import { browserHistory, hashHistory } from 'react-router';

const types = {
    browser : browserHistory,
    hash : hashHistory
};

export default types['browser'];