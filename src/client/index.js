import { getGeonames } from './js/app'
// import { handleSubmit } from './js/formHandler'
// import img from './img/yulia_logo.svg'

import './../client/styles/appStyles.scss';

document.getElementById("submit-form").addEventListener('click', getGeonames);

console.log("CHANGE!!");

export {
    getGeonames,
    // handleSubmit,
    // img
}
