import { GET_BREVET } from "actions/brevets.action";
const initialState = {};

export default function userReducer(state = initialState, action){
  switch(action.type){
    case GET_BREVET:
      return action.payload
    default:
      return state;
  }
}