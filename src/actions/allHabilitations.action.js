import axios from "axios";


export const GET_ALL_HABILITATION = "GET_ALL_HABILITATION";
export const GET_ALL_HABILITATION_ERRORS = "GET_ALL_HABILITATION_ERRORS";


export const getAllHabilitations = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/allHabilitations`)
      .then((res) => {
        dispatch({ type: GET_ALL_HABILITATION, payload: res.data });
        if (res.data.errors) {
          dispatch({ type: GET_ALL_HABILITATION_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_ALL_HABILITATION_ERRORS, payload: "" });
          
        }
      })
      .catch((err) => console.log(err));
      // console.log(err);
  };
};