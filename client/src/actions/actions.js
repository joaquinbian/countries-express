//tambien agregar los filtrados
export const GET_COUNTRIES = "GET_COUNTRIES"
export const GET_COUNTRY_DETAIL = "COUNTRY_DETAIL"
export const GET_COUNTRIES_BY_NAME = "GET_COUNTRIES_BY_NAME"
export const SORT_BY_POPULATION = "SORT_BY_POPULATION"
export const SORT_BY_POPULATION_DESC = "SORT_BY_POPULATION_DESC"
export const SORT_ALPHABETICALLY = "SORT_ALPHABETICALLY"
export const SORT_ALPHABETICALLY_ZA = "SORT_ALPHABETICALLY_ZA"
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT"
export const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVITY"

export const getCountries = () => {
    return function(dispatch){
        return fetch("http://localhost:3001/countries")
        .then(r => r.json())
        .then(json => {
            dispatch({type: GET_COUNTRIES, payload: json})
        })
    }
}
export const getCountriesByName = (name) => {
    return function(dispatch){
        return fetch(`http://localhost:3001/countries?name_query=${name}`)
        .then(r => r.json())
        .then(json => {
            dispatch({type: GET_COUNTRIES_BY_NAME, payload: json})
        })
        .catch(err =>{console.log({error: "no se encontro ninguna coincidencia"})})
    }
}

export const getCountryDetail = (id) => {
    return function(dispatch){
        return fetch(`http://localhost:3001/countries/${id}`)
        .then(r => r.json())
        .then(json => {
            dispatch({type: GET_COUNTRY_DETAIL, payload: json})
        })
    }
}
export const sortByPopulation = () => {
    return {
        type: SORT_BY_POPULATION,
    }
}
export const sortByPopulationDesc = () =>{
    return {
        type: SORT_BY_POPULATION_DESC
    }
}
export const sortAlphabetically = () => {
    return {
        type: SORT_ALPHABETICALLY
    }
}
export const sortAlphabeticallyZa = () =>{
    return {
        type: SORT_ALPHABETICALLY_ZA
    }
}

export const filterByContinent = (payload)=>{
    return {
        type: FILTER_BY_CONTINENT,
        payload
    }
}
export const filterByActivity = (payload) => {
    return{
        type: FILTER_BY_ACTIVITY,
        payload
    }
}