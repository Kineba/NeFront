import axios from "axios";


export const GET_ALL_THESE = "GET_ALL_THESE";
export const GET_ALL_THESE_ERRORS = "GET_ALL_THESE_ERRORS";


export const getAllTheses = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/allThesis`)
      .then((res) => {
        dispatch({ type: GET_ALL_THESE, payload: res.data });
        if (res.data.errors) {
          dispatch({ type: GET_ALL_THESE_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_ALL_THESE_ERRORS, payload: "" });
          
        }
      })
      .catch((err) => console.log(err));
      // console.log(err);
  };
};