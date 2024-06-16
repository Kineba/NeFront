import axios from "axios";


export const GET_OUVRAGE = "GET_OUVRAGE";
export const GET_OUVRAGE_ERRORS = "GET_OUVRAGE_ERRORS";

export const getOuvrages = (email) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/userOuvrages/${email}`)
      .then((res) => {
        dispatch({ type: GET_OUVRAGE, payload: res.data });
        if (res.data.errors) {
          dispatch({ type: GET_OUVRAGE_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_OUVRAGE_ERRORS, payload: "" });
          
        }
      })
      .catch((err) => console.log(err));
  };
};