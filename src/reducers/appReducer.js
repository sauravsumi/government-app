const initialState = {
    countries: []
  }
export default function appReducer(state = initialState, action) {
    switch(action.type) {
        case 'LOAD_COUNTRIES' : {
            return Object.assign({}, state, {
                countries : parseRawCountriesInfoToCountries(action.countriesRawInfo)
            })
          }
        default:
            return state  
    }
}

function parseRawCountriesInfoToCountries(countriesRawInfo) {
    console.log('countriesRawInfo: ', countriesRawInfo)
    let countries = countriesRawInfo.map(e => e.name)
    console.log('mapped countries: ', countries)
    return countries
}