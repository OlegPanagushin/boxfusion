import { NEW_MESSAGE } from "../../store/rootReducer";

export const SELECT_COUNTRY = "SELECT_COUNTRY";
export const SELECT_REGION = "SELECT_REGION";

export const GET_COUNTRIES_REQUEST = "GET_COUNTRIES_REQUEST";
export const GET_COUNTRIES_SUCCESS = "GET_COUNTRIES_SUCCESS";
export const GET_COUNTRIES_FAIL = "GET_COUNTRIES_FAIL";

export const GET_REGIONS_REQUEST = "GET_REGIONS_REQUEST";
export const GET_REGIONS_SUCCESS = "GET_REGIONS_SUCCESS";
export const GET_REGIONS_FAIL = "GET_REGIONS_FAIL";

export const FIND_COUNTRY_REQUEST = "FIND_COUNTRY_REQUEST";
export const FIND_COUNTRY_SUCCESS = "FIND_COUNTRY_SUCCESS";
export const FIND_COUNTRY_FAIL = "FIND_COUNTRY_FAIL";

export const VALIDATION_ERROR = "VALIDATION_ERROR";
export const VALIDATION_SUCCESS = "VALIDATION_SUCCESS";

const parser = r => r.json().then(r => JSON.parse(r));

const headers = new Headers({
  Accept: "application/json"
});

const requestInit = {
  method: "GET",
  headers
};

export const actionCreators = {
  getCountries: () => dispatch => {
    dispatch({ type: GET_COUNTRIES_REQUEST });

    fetch("api/data/country/all/", requestInit)
      .then(parser)
      .then(countries => dispatch({ type: GET_COUNTRIES_SUCCESS, countries }))
      .catch(e => {
        dispatch({ type: GET_COUNTRIES_FAIL });
        dispatch({ type: NEW_MESSAGE, message: e });
      });
  },

  selectCountry: country => dispatch => {
    dispatch({ type: SELECT_COUNTRY, country });
    dispatch({ type: GET_REGIONS_REQUEST });
    fetch(`api/data/region/${country}/all`, requestInit)
      .then(parser)
      .then(regions => dispatch({ type: GET_REGIONS_SUCCESS, regions }))
      .catch(e => {
        dispatch({ type: GET_REGIONS_FAIL });
        dispatch({ type: NEW_MESSAGE, message: e });
      });
  },

  selectRegion: region => ({
    type: SELECT_REGION,
    region
  }),

  findCountry: region => dispatch => {
    dispatch({ type: FIND_COUNTRY_REQUEST });

    fetch(`api/data/find/country/${region}`, requestInit)
      .then(parser)
      .then(regions => dispatch({ type: FIND_COUNTRY_SUCCESS, regions }))
      .catch(e => {
        dispatch({ type: FIND_COUNTRY_FAIL });
        dispatch({ type: NEW_MESSAGE, message: e });
      });
  },

  validate: (required, customValidation, newCountry, newRegion) => (
    dispatch,
    getState
  ) => {
    if (required) {
      const state = getState();
      const { selectedRegion: prevRegion } = state.region;

      if (prevRegion && !newRegion) {
        dispatch({ type: VALIDATION_ERROR, errorMessage: "Обязательное поле" });
        return;
      }
    }
    if (customValidation) {
      const errorMessage = customValidation(newCountry, newRegion);
      if (errorMessage) {
        dispatch({ type: VALIDATION_ERROR, errorMessage });
        return;
      }
    }
    dispatch({ type: VALIDATION_SUCCESS });
  }
};

const initialState = {
  countries: [],
  regions: [],
  selectedCountry: "",
  selectedRegion: "",
  errorMessage: "",
  countriesLoading: false,
  regionsLoading: false,
  lookingForCountry: false
};

export default (state = { ...initialState }, action) => {
  const {
    type,
    countries = [],
    regions,
    country,
    region,
    errorMessage
  } = action;

  switch (type) {
    case GET_COUNTRIES_REQUEST:
      return { ...state, countriesLoading: true };
    case GET_COUNTRIES_SUCCESS:
    case GET_COUNTRIES_FAIL:
      return { ...state, countriesLoading: false, countries };

    case GET_REGIONS_REQUEST:
      return { ...state, regionsLoading: true };
    case GET_REGIONS_SUCCESS:
    case GET_REGIONS_FAIL:
      return { ...state, regionsLoading: false, regions };

    case SELECT_COUNTRY:
      return { ...state, selectedCountry: country };

    case SELECT_REGION:
      return { ...state, selectedRegion: region };

    case VALIDATION_ERROR:
      return { ...state, errorMessage };

    case VALIDATION_SUCCESS:
      return { ...state, errorMessage: "" };

    default:
      return { ...state };
  }
};
