import axios from "axios";


export const GET_HABILITATION = "GET_HABILITATION";
export const GET_HABILITATION_ERRORS = "GET_HABILITATION_ERRORS";

export const getHabilitations = (id) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/userHabilitations/${id}`)
      .then((res) => {
        dispatch({ type: GET_HABILITATION, payload: res.data });
        if (res.data.errors) {
          dispatch({ type: GET_HABILITATION_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_HABILITATION_ERRORS, payload: "" });
          
        }
      })
      .catch((err) => console.log(err));
  };
};