import { GET_ALL_COUNTRIES } from "../actionsName";

const iniState = {
  countries: [],
  result: [],
};

const reducer = (state = iniState, action) => {
  switch (action.type) {
    case GET_ALL_COUNTRIES:
      console.log(action.payload.length);
      return {
        ...state,
        countries: action.payload,
      };
    case "CountriesFilter":
      console.log("CountriesFilter");
      return { ...state, result: action.payload };

    default:
      return state;
  }
};

export default reducer;
