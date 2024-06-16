import axios from "axios";

export const GET_SECRETAIRE = "GET_SECRETAIRE";

export const getSecretaire = (uid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/secretaire`)
      .then((res) => {
        dispatch({ type: GET_SECRETAIRE, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};