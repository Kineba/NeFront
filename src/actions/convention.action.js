import axios from "axios";

export const GET_CONVENTION = "GET_CONVENTION";
export const GET_CONVENTION_ERRORS = "GET_CONVENTION_ERRORS";

export const getConventions = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/allconventions`)
      .then((res) => {
        dispatch({ type: GET_CONVENTION, payload: res.data });
        if (res.data.errors) {
          dispatch({ type: GET_CONVENTION_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_CONVENTION_ERRORS, payload: "" });
        }
      })
      .catch((err) => console.log(err));
  };
};
