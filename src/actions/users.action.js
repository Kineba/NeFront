import axios from "axios";

export const GET_USERS = "GET_USERS";

export const getUsers = (uid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/users`)
      .then((res) => {
        dispatch({ type: GET_USERS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};