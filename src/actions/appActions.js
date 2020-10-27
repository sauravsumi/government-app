import { _get, _post } from './../service/api.js' 

import store from './../store/store.js'
const loadCountries = () => {
    let callbackFunction = (countriesRawInfo) => {
        store.dispatch({type: 'LOAD_COUNTRIES', countriesRawInfo : countriesRawInfo })
    }
    _get('https://restcountries.eu/rest/v1/region/Europe', '', callbackFunction );
}

export {
    loadCountries
}