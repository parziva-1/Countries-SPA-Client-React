import { GET_ALL_COUNTRIES } from "./actionsName";

const getAllCountries = () => {
  return async (dispatch) => {
    const res = await fetch("http://localhost:3001/country", {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
      },
    });
    const data = await res.json();
    dispatch({
      type: GET_ALL_COUNTRIES,
      payload: data,
    });
  };
};

export { getAllCountries };
