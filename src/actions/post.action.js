import axios from "axios";
export const GET_POSTS = "GET_POSTS";
export const GET_POST_ERRORS = "GET_POST_ERRORS";

export const getPosts = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post/get/actuality`)
      .then((res) => {
        dispatch({ type: GET_POSTS, payload: res.data });
        if (res.data.errors) {
          dispatch({ type: GET_POST_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_POST_ERRORS, payload: "" });
        }
      })
      .catch((err) => console.log(err));
    // console.log(err);
  };
};
