import axios from "axios";


export const GET_ALL_MASTER = "GET_ALL_MASTER";
export const GET_ALL_MASTER_ERRORS = "GET_ALL_MASTER_ERRORS";


export const getAllMasters = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/allMasters`)
      .then((res) => {
        dispatch({ type: GET_ALL_MASTER, payload: res.data });
        if (res.data.errors) {
          dispatch({ type: GET_ALL_MASTER_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_ALL_MASTER_ERRORS, payload: "" });
          
        }
      })
      .catch((err) => console.log(err));
      // console.log(err);
  };
};