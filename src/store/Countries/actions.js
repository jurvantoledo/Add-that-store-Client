import axios from "axios";

const COUNTRIES_API_URL = `https://restcountries.eu/rest/v2/all`;

export const FETCH_COUNTRIES_SUCCES = "FETCH_COUNTRIES_SUCCES";

export const fetchCountriesSucces = countries => ({
    type: FETCH_COUNTRIES_SUCCES,
    payload: countries
})


export const fetchCountries = () => {
    return async (dispatch, getState) => {
        const response = await axios.get(
            `${COUNTRIES_API_URL}`
        )

        dispatch(fetchCountriesSucces(response.data))
    }
}