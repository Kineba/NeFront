import axios from "axios";


export const GET_ALL_ARTICLE = "GET_ALL_ARTICLE";
export const GET_ALL_ARTICLE_ERRORS = "GET_ALL_ARTICLE_ERRORS";


export const getAllArticles = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/allArticles`)
      .then((res) => {
        dispatch({ type: GET_ALL_ARTICLE, payload: res.data });
        if (res.data.errors) {
          dispatch({ type: GET_ALL_ARTICLE_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_ALL_ARTICLE_ERRORS, payload: "" });
          
        }
      })
      .catch((err) => console.log(err));
      // console.log(err);
  };
};