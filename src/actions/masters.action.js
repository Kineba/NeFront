import axios from "axios";


export const GET_MASTER = "GET_MASTER";
export const GET_MASTER_ERRORS = "GET_MASTER_ERRORS";

export const getMasters = (email) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/userMasters/${email}`)
      .then((res) => {
        dispatch({ type: GET_MASTER, payload: res.data });
        if (res.data.errors) {
          dispatch({ type: GET_MASTER_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_MASTER_ERRORS, payload: "" });
          
        }
      })
      .catch((err) => console.log(err));
  };
};