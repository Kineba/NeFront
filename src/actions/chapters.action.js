import axios from "axios";


export const GET_CHAPTER = "GET_CHAPTER";
export const GET_CHAPTER_ERRORS = "GET_CHAPTER_ERRORS";

export const getChapters = (email) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/userChapters/${email}`)
      .then((res) => {
        dispatch({ type: GET_CHAPTER, payload: res.data });
        if (res.data.errors) {
          dispatch({ type: GET_CHAPTER_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_CHAPTER_ERRORS, payload: "" });
          
        }
      })
      .catch((err) => console.log(err));
  };
};