import axios from "axios";
export const GET_CONTACTS = "GET_CONTACTS";

export const getContacts = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/get/contact`)
      .then((res) => {
        dispatch({ type: GET_CONTACTS, payload: res.data });
      })
      .catch((err) => console.log(err));
    // console.log(err);
  };
};
