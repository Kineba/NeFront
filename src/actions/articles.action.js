import axios from "axios";


export const GET_ARTICLE = "GET_ARTICLE";
export const GET_ARTICLE_ERRORS = "GET_ARTICLE_ERRORS";


export const getArticles = (email) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/userArticles/${email}`)
      .then((res) => {
        dispatch({ type: GET_ARTICLE, payload: res.data });
        if (res.data.errors) {
          dispatch({ type: GET_ARTICLE_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_ARTICLE_ERRORS, payload: "" });
          
        }
      })
      .catch((err) => console.log(err));
      // console.log(err);
  };
};


