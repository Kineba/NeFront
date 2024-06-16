import axios from "axios";


export const GET_BREVET = "GET_BREVET";
export const GET_BREVET_ERRORS = "GET_BREVET_ERRORS";

export const getBrevets = (user_id) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/userBrevets/${user_id}`)
      .then((res) => {
        dispatch({ type: GET_BREVET, payload: res.data });
        if (res.data.errors) {
          dispatch({ type: GET_BREVET_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_BREVET_ERRORS, payload: "" });
          
        }
      })
      .catch((err) => console.log(err));
  };
};