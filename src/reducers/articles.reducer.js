import { GET_ARTICLE } from "actions/articles.action";
const initialState = {};

export default function userReducer(state = initialState, action){
  switch(action.type){
    case GET_ARTICLE:
      return action.payload
    default:
      return state;
  }
}