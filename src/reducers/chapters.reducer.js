import { GET_CHAPTER } from "actions/chapters.action";
const initialState = {};

export default function userReducer(state = initialState, action){
  switch(action.type){
    case GET_CHAPTER:
      return action.payload
    default:
      return state;
  }
}