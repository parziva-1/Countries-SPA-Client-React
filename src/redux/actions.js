import { GET_ALL_COUNTRIES } from "./actionsName";

const getAllCountries = () => {
  return async (dispatch) => {
    console.log("Actions dispatch");
    const res = await fetch("http://localhost:3001/country");
    const data = await res.json();
    dispatch({
      type: GET_ALL_COUNTRIES,
      payload: data,
    });
  };
};

export { getAllCountries };
