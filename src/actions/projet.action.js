import axios from "axios";


export const GET_PROJET = "GET_PROJET";
export const GET_PROJET_ERRORS = "GET_PROJET_ERRORS";


export const getProjets = (email) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/allprojets`)
      .then((res) => {
        dispatch({ type: GET_PROJET, payload: res.data });
        if (res.data.errors) {
          dispatch({ type: GET_PROJET_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_PROJET_ERRORS, payload: "" });
          
        }
      })
      .catch((err) => console.log(err));
      // console.log(err);
  };
};