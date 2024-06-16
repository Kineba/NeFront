import axios from "axios";


export const GET_ALL_CHAPTER = "GET_ALL_CHAPTER";
export const GET_ALL_CHAPTER_ERRORS = "GET_ALL_CHAPTER_ERRORS";

export const getAllChapters = (email) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/allChapters`)
      .then((res) => {
        dispatch({ type: GET_ALL_CHAPTER, payload: res.data });
        if (res.data.errors) {
          dispatch({ type: GET_ALL_CHAPTER_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_ALL_CHAPTER_ERRORS, payload: "" });
          
        }
      })
      .catch((err) => console.log(err));
  };
};