import { getGeonames } from './js/app'

import './../client/styles/appStyles.scss';

document.getElementById("submit-form").addEventListener('click', getGeonames);

console.log("CHANGE!!");

export {
    getGeonames,
}
