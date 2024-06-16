import { GET_THESE } from "actions/theses.action";
const initialState = {};

export default function userReducer(state = initialState, action){
  switch(action.type){
    case GET_THESE:
      return action.payload
    default:
      return state;
  }
}