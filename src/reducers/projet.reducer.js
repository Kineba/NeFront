import { GET_PROJET } from "actions/projet.action";
const initialState = {};

export default function userReducer(state = initialState, action){
  switch(action.type){
    case GET_PROJET:
      return action.payload
    default:
      return state;
  }
}