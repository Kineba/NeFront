import axios from "axios";


export const GET_ALL_OUVRAGE = "GET_ALL_OUVRAGE";
export const GET_ALL_OUVRAGE_ERRORS = "GET_ALL_OUVRAGE_ERRORS";


export const getAllOuvrages = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/allOuvrages`)
      .then((res) => {
        dispatch({ type: GET_ALL_OUVRAGE, payload: res.data });
        if (res.data.errors) {
          dispatch({ type: GET_ALL_OUVRAGE_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_ALL_OUVRAGE_ERRORS, payload: "" });
          
        }
      })
      .catch((err) => console.log(err));
      // console.log(err);
  };
};