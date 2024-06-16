import { GET_ALL_ARTICLE } from "actions/allArticles.action";
const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ARTICLE:
      return action.payload;
    default:
      return state;
  }
}
