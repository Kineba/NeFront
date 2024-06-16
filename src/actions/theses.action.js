import axios from "axios";


export const GET_THESE = "GET_THESE";
export const GET_THESE_ERRORS = "GET_THESE_ERRORS";

export const getTheses = (email) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/userThesis/${email}`)
      .then((res) => {
        dispatch({ type: GET_THESE, payload: res.data });
        if (res.data.errors) {
          dispatch({ type: GET_THESE_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_THESE_ERRORS, payload: "" });
          
        }
      })
      .catch((err) => console.log(err));
  };
};