import { GET_OUVRAGE } from "actions/ouvrages.action";
const initialState = {};

export default function userReducer(state = initialState, action){
  switch(action.type){
    case GET_OUVRAGE:
      return action.payload
    default:
      return state;
  }
}