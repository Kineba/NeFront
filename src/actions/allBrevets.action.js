import axios from "axios";


export const GET_ALL_BREVET = "GET_ALL_BREVET";
export const GET_ALL_BREVET_ERRORS = "GET_ALL_BREVET_ERRORS";


export const getAllBrevets = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/allBrevets`)
      .then((res) => {
        dispatch({ type: GET_ALL_BREVET, payload: res.data });
        if (res.data.errors) {
          dispatch({ type: GET_ALL_BREVET_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_ALL_BREVET_ERRORS, payload: "" });
          
        }
      })
      .catch((err) => console.log(err));
      // console.log(err);
  };
};