import { GET_MANIFESTATION } from "actions/manifestation.action";
const initialState = {};

export default function userReducer(state = initialState, action){
  switch(action.type){
    case GET_MANIFESTATION:
      return action.payload
    default:
      return state;
  }
}